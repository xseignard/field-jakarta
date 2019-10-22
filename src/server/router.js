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

    this.api.get('/sequence/:id/:loop', async (req, res) => {
      const id = parseInt(req.params.id, 10)
      const loop = parseInt(req.params.loop, 10)
      console.log(`sequence: ${id}, loop: ${loop}`)
      this.osc.sequence(id, loop)
      res.status(200).json()
    })

    this.api.get('/play/:loop', async (req, res) => {
      const loop = parseInt(req.params.loop, 10)
      console.log(`play, loop: ${loop}`)
      this.osc.play(loop)
      res.status(200).json()
    })

    this.api.get('/stop/:loop?', async (req, res) => {
      console.log('stop')
      this.osc.stop()
      res.status(200).json()
    })

    this.api.get('/loop/:active?', async (req, res) => {
      const active = parseInt(req.params.active, 10)
      console.log(`loop: ${active}`)
      this.osc.loop(active)
      res.status(200).json()
    })
  }
}

module.exports = Router
