const osc = require('node-osc')
const async = require('async')

class OSC {
  constructor() {
    this.client = new osc.Client('localhost', 1234)
    // start vezér with some default values
    // e.g. playing all comps in loop
    this.play(1)
    this.loop(1)
    this.soloMode(1)
    this.client.send('/vezer/selectcompatindex/', 1)
  }

  /**
   * Sends OSC messages in serie
   * @param {Array<Object>} messages - array of messages to send, each message is a OSC address and a value
   * @param {Function} callback - function to execute once the messages have been sent, defaults to noop
   * @param {Number} timeout - timeout between each OSC messages, defaults to 100
   */
  sendMessages(messages, callback = () => {}, timeout = 100) {
    const actions = messages.map(m => {
      return cb =>
        this.client.send(`/vezer/${m.route}/`, m.value, () =>
          setTimeout(cb, timeout)
        )
    })
    async.series(actions, callback)
  }

  /**
   * Trigger global play. Always rewind before playing
   * @param {Number} loop - 1 if loop mode enabled, 0 otherwise
   */
  play(loop) {
    let messages = [
      // rewind all comps
      { route: 'rewindall', value: 0 },
      // stop global play
      { route: 'playall', value: 0 },
      // turn on global queue
      { route: 'queuedmode', value: 1 },
      // turn on/off global loop
      { route: 'queuedloop', value: loop },
    ]
    this.sendMessages(messages, () => {
      this.sendMessages([
        // select first comp
        { route: 'selectcompatindex', value: 1 },
        // start global play
        { route: 'playall', value: 1 },
      ])
    })
  }

  /**
   * Global stop. It means the following:
   * - blackout
   * - stop the global play
   * - stop individual comps (if any playing)
   * - rewind all comps for a next start
   */
  stop() {
    this.sendMessages([
      // turn off all (e.g send art-net value 0 to all)
      { route: 'blackout', value: 0 },
      // stop global play
      { route: 'playall', value: 0 },
      // stop running comps
      { route: 'stopcomps', value: 0 },
      // rewind all comps
      { route: 'rewindall', value: 0 },
    ])
  }

  /**
   * Triggers a given sequence
   * @param {Number} id - id of the sequence (starting at 1)
   * @param {Number} loop - 1 if loop mode enabled, 0 otherwise
   */
  sequence(id, loop) {
    let messages = [
      // stop global play
      { route: 'playall', value: 0 },
      // stop running comps
      { route: 'stopcomps', value: 0 },
      // rewind all comps
      { route: 'rewindall', value: 0 },
      // turn off global queue
      { route: 'queuedmode', value: 0 },
      // turn off global loop
      { route: 'queuedloop', value: 0 },
    ]
    this.sendMessages(messages, () => {
      // trigger selected comp
      this.sendMessages([{ route: 'triggercompatindex', value: id }], () => {
        // activate comp loop
        this.sendMessages([{ route: 'current/loop', value: loop }])
      })
    })
  }

  /**
   * Turns on/off the loop
   * @param {Number} active - 1 if loop mode enabled, 0 otherwise
   */
  loop(active) {
    this.sendMessages([
      // turn on/off global queue and global loop
      { route: 'queuedmode', value: active },
      { route: 'queuedloop', value: active },
    ])
  }

  /**
   * Turns on/off the solo mode
   * @param {Number} active - 1 if solo mode enabled, 0 otherwise
   */
  soloMode(active) {
    // solo mode enforces that only one comp is playing
    this.sendMessages([{ route: 'solomode', value: active }])
  }
}

module.exports = OSC
