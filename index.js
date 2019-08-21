const express = require('express')
const app = express()
const app_port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(app_port, () => console.log(`Example app listening on port ${app_port}!`))


const Readline = require('@serialport/parser-readline')
const SerialPort = require('serialport')
const port = new SerialPort('/dev/cu.usbmodem14202', {
  baudRate: 115200
}, function (err) {
  if (err) {
    return console.log('Error: ', err.message)
  }
})

// 0 = mouth open
// 1 = mouth closed
// 2 = eyebrows raised
// 3 = eyebrows lowered
// 4 = happy face
// 5 = happy off
// 6 = kissing face
// 7 = kissing off

const parser = new Readline()
port.pipe(parser)

parser.on('data', line => console.log(`> ${line}`))

var stdin = process.openStdin();

app.get('/send/:callid', function (req, res) {
  port.write(req.params.callid + '#', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log('sent ' + req.params.callid);
    res.send('success');
  })
})

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that
    // with toString() and then trim()
    console.log("you entered: [" + d.toString().trim() + "]");
    port.write(d.toString().trim() + '#', function(err) {
      if (err) {
        return console.log('Error on write: ', err.message)
      }
      console.log('sent ' + d.toString().trim())
    })

  });
