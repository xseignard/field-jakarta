const osc = require('node-osc')
const async = require('async')

class OSC {
  constructor() {
    this.client = new osc.Client('localhost', 1234)
    // start vezér with some default values
    // TODO: start playing directly ?
    this.stop()
    this.loop(true)
    this.soloMode(true)
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
   */
  play() {
    this.sendMessages([
      { route: 'rewindall', value: 0 },
      { route: 'playall', value: 0 },
      { route: 'playall', value: 1 },
    ])
  }

  /**
   * Global stop. It means the following:
   * - blackout
   * - stop the global play
   * - stop individual comps (if any, shouldn't)
   * - rewind all comps for a next start
   */
  stop() {
    this.sendMessages([
      { route: 'blackout', value: 0 },
      { route: 'playall', value: 0 },
      { route: 'stopcomps', value: 0 },
      { route: 'rewindall', value: 0 },
    ])
  }

  /**
   * Turns on/off the loop
   * @param {Boolean} active - whether the loop mode is active or not
   */
  loop(active) {
    this.sendMessages([
      { route: 'queuedmode', value: active ? 1 : 0 },
      { route: 'queuedloop', value: active ? 1 : 0 },
    ])
  }

  /**
   * Turns on/off the solo mode
   * @param {Boolean} active - whether the solo mode is active or not
   */
  soloMode(active) {
    this.sendMessages([{ route: 'solomode', value: active ? 1 : 0 }])
  }

  /**
   * Triggers a given sequence
   * @param {Number} id - id of the sequence (starting at 1)
   */
  sequence(id) {
    this.sendMessages(
      [
        { route: 'blackout', value: 0 },
        { route: 'playall', value: 0 },
        { route: 'stopcomps', value: 0 },
        { route: 'rewindall', value: 0 },
      ],
      () => {
        this.client.send('/vezer/triggercompatindex/', id)
      }
    )
  }
}

module.exports = OSC
