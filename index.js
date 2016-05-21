'use strict'

var crypto = require('crypto')
var fs = require('fs')

function md5FileSync (filename) {
  var sum = crypto.createHash('md5')
  var data = fs.readFileSync(filename)

  return sum.update(data).digest('hex')
}

module.exports = function (filename, cb) {
  if (typeof cb !== 'function') {
    return md5FileSync(filename)
  }

  var output = crypto.createHash('md5')
  var input = fs.createReadStream(filename)

  input.on('error', function (err) {
    cb(err)
  })

  output.on('readable', function () {
    cb(null, output.read().toString('hex'))
  })

  input.pipe(output)
}
