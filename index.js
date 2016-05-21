'use strict'

var crypto = require('crypto')
var fs = require('fs')

function md5FileSync (filename) {
  var sum = crypto.createHash('md5')
  var data = fs.readFileSync(filename)

  return sum.update(data).digest('hex')
}

module.exports = function (filename, callback) {
  if (typeof callback !== 'function') {
    return md5FileSync(filename)
  }

  var sum = crypto.createHash('md5')
  var fileStream = fs.createReadStream(filename)
  fileStream.on('error', function (err) {
    return callback(err, null)
  })
  fileStream.on('data', function (chunk) {
    try {
      sum.update(chunk)
    } catch (ex) {
      return callback(ex, null)
    }
  })
  fileStream.on('end', function () {
    return callback(null, sum.digest('hex'))
  })
}
