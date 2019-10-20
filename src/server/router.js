const express = require('express')
const OSC = require('./osc')
const Composition = require('./composition')

class Router {
  constructor() {
    this.osc = new OSC()
    this.compo = new Composition()
    this.api = express.Router()

    this.api.get('/sequences', async (req, res) => {
      console.log('sequences')
      const sequences = this.compo.getSequences()
      res.status(200).json(sequences)
    })

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

    this.api.get('/loop/:active?', async (req, res) => {
      const active = parseInt(req.params.active, 10) === 1 ? true : false
      console.log(`loop ${active}`)
      this.osc.loop(active)
      res.status(200).json()
    })
  }
}

module.exports = Router
