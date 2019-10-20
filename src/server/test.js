const { Server } = require('node-osc')

var server = new Server(8000, '0.0.0.0')

server.on('message', ([address, value]) => {
  if (!address.includes('current')) {
    if (address.endsWith('/play')) {
      console.log(address, value)
    }
  }
})
