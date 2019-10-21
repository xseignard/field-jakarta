require('dotenv-flow').config()
const express = require('express')
const cors = require('cors')
const Router = require('./router')

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

// server starting process
const start = async () => {
  // front end serving
  if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('./dist'))
  }
  // connect the http router
  const router = new Router()
  app.use('/api', router.api)
  // start the whole thing
  app.listen(PORT, () => {
    console.log(`Wok Hei server listening on port ${PORT}!`)
  })

  // cleanup handler
  const cleanup = () => {
    console.log('do something here!!! (if needed)')
    setTimeout(() => {
      process.exit()
    }, 10)
  }
  process.on('exit', cleanup)
  process.on('SIGINT', cleanup)
  process.on('SIGUSR1', cleanup)
  process.on('SIGUSR2', cleanup)
  process.on('SIGTERM', cleanup)
  process.on('uncaughtException', err => {
    console.log(err)
    cleanup()
  })
}

// Wait for some time before starting the server
// So we are sure Vezér have sarted
console.log(
  `Waiting ${process.env.SERVER_START_TIMEOUT} secs for the timeline editor (Vezér) to start...`
)
setTimeout(() => {
  start()
}, process.env.SERVER_START_TIMEOUT * 1000)
