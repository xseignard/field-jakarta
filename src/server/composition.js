const fs = require('fs')
const path = require('path')
const plist = require('plist')

class Composition {
  constructor(filename = 'compo.vzr') {
    this.file = path.join(__dirname, '..', 'vezer', filename)
  }

  getSequences() {
    const compo = plist.parse(fs.readFileSync(this.file, 'utf8'))
    let i = 0
    let next = `Comp-${i}`
    const sequences = []
    while (compo[next]) {
      sequences.push({
        id: i + 1,
        name: compo[next].compName,
      })
      i++
      next = `Comp-${i}`
    }
    return sequences
  }
}

module.exports = Composition
