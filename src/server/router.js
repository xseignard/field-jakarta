const express = require('express')
const OSC = require('./osc')

class Router {
  constructor() {
    this.osc = new OSC()
    this.api = express.Router()

    this.api.get('/sequence/:id?', async (req, res) => {
      console.log(`sequence ${req.params.id}`)
      this.osc.sequence(parseInt(req.params.id, 10))
      res.status(200).json()
    })

    this.api.get('/play', async (req, res) => {
      console.log('play')
      this.osc.play()
      res.status(200).json()
    })

    this.api.get('/stop', async (req, res) => {
      console.log('stop')
      this.osc.stop()
      res.status(200).json()
    })
  }
}

module.exports = Router
