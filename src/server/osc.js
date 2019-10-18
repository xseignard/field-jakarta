const osc = require('node-osc')
const async = require('async')

const timeout = 200

class OSC {
  constructor() {
    this.client = new osc.Client('localhost', 1234)
  }

  play() {
    this.client.send('/vezer/playall/', 1)
  }

  stop() {
    const actions = ['blackout', 'playall', 'stopcomps', 'rewindall'].map(a => {
      return cb =>
        this.client.send(`/vezer/${a}/`, 0, () => setTimeout(cb, timeout))
    })
    async.series(actions)
  }

  sequence(id) {
    const actions = ['blackout', 'stopcomps', 'rewindall'].map(a => {
      return cb =>
        this.client.send(`/vezer/${a}/`, 0, () => setTimeout(cb, timeout))
    })
    async.series(actions, () => {
      this.client.send('/vezer/triggercompatindex/', id)
    })
  }
}

module.exports = OSC
