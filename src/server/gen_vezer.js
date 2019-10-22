const keyFrame = (key, time, value) => `
<key>${key}</key>
<dict>
  <key>interpolation</key>
  <string>Cubic Ease-In-Out</string>
  <key>time</key>
  <integer>${time}</integer>
  <key>value</key>
  <real>${value}.0</real>
</dict>
`

const keyFrames = [keyFrame(0, 0, 0)]
let time = 0

for (let i = 1; i <= 12; i++) {
  if (i % 2) {
    // odd: time + 90, value: 255
    time += 450
    keyFrames.push(keyFrame(i, time, 255))
  } else {
    // even: time + 210, value 0
    time += 450
    keyFrames.push(keyFrame(i, time, 0))
  }
}

console.log(keyFrames.join(''))
