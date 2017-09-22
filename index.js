'use strict'

var crypto = require('crypto')
var fs = require('fs')
var alloc = require('buffer-alloc')

var BUFFER_SIZE = 8192

function md5FileSync (filename) {
  var fd = fs.openSync(filename, 'r')
  var hash = crypto.createHash('md5')
  var buffer = alloc(BUFFER_SIZE)

  try {
    var bytesRead

    do {
      bytesRead = fs.readSync(fd, buffer, 0, BUFFER_SIZE)
      hash.update(buffer.slice(0, bytesRead))
    } while (bytesRead === BUFFER_SIZE)
  } finally {
    fs.closeSync(fd)
  }

  return hash.digest('hex')
}

function md5DirSync (dirname, ignorePaths) {
  if (!fs.existsSync(dirname)) {
    throw new Error(dirname + ' does not exist.')
  } else if (!fs.statSync(dirname).isDirectory()) {
    throw new Error(dirname + ' is not a directory.')
  }

  if (ignorePaths && Object.prototype.toString.call(ignorePaths).slice(8, -1) !== 'Array') {
    ignorePaths = [ignorePaths]
  }
  for (var i = 0; i < ignorePaths.length; i++) {
    ignorePaths[i] = fs.realpathSync(ignorePaths[i])
  }

  var files = fs.readdirSync(dirname)
  var hash = crypto.createHash('md5')

  for (i = 0; i < files.length; i++) {
    var fullPath = fs.realpathSync(dirname + '/' + files[i])

    if (ignorePaths.indexOf(fullPath) !== -1) {
      continue
    }

    var fileStats = fs.statSync(fullPath)
    var fileHash
    if (fileStats.isDirectory()) {
      fileHash = md5DirSync(fullPath, ignorePaths)
    } else if (fileStats.isFile()) {
      fileHash = md5FileSync(fullPath)
    } else {
      continue
    }

    hash.update(fileHash)
  }

  return hash.digest('hex')
}

function md5File (filename, cb) {
  if (typeof cb !== 'function') throw new TypeError('Argument cb must be a function')

  var output = crypto.createHash('md5')
  var input = fs.createReadStream(filename)

  input.on('error', function (err) {
    cb(err)
  })

  output.once('readable', function () {
    cb(null, output.read().toString('hex'))
  })

  input.pipe(output)
}

module.exports = md5File
module.exports.sync = md5FileSync
module.exports.dirSync = md5DirSync
