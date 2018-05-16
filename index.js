'use strict'

const crypto = require('crypto')
const fs = require('fs')

const BUFFER_SIZE = 8192

function md5FileSync (filename) {
  const fd = fs.openSync(filename, 'r')
  const hash = crypto.createHash('md5')
  const buffer = Buffer.alloc(BUFFER_SIZE)

  try {
    let bytesRead

    do {
      bytesRead = fs.readSync(fd, buffer, 0, BUFFER_SIZE)
      hash.update(buffer.slice(0, bytesRead))
    } while (bytesRead === BUFFER_SIZE)
  } finally {
    fs.closeSync(fd)
  }

  return hash.digest('hex')
}

function md5File (filename, cb) {
  if (typeof cb !== 'function') throw new TypeError('Argument cb must be a function')

  const output = crypto.createHash('md5')
  const input = fs.createReadStream(filename)

  input.on('error', function (err) {
    cb(err)
  })

  output.once('readable', function () {
    cb(null, output.read().toString('hex'))
  })

  input.pipe(output)
}

function md5BufferSync (buffer) {
  const hash = crypto.createHash('md5')
  const total = buffer.length

  let begin = 0

  do {
    // slice(begin, end)
    // if end is greater than the length, only to the real end
    const read = buffer.slice(begin, BUFFER_SIZE)
    hash.update(read)
    begin += BUFFER_SIZE
    if (begin >= total) break
  } while (true)

  return hash.digest('hex')
}

module.exports = md5File
module.exports.sync = md5FileSync
module.exports.bufferSync = md5BufferSync
