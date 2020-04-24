const crypto = require('crypto')
const fs = require('fs')
const fsP = require('fs').promises

const BUFFER_SIZE = 8192

function md5FileSync (path) {
  const fd = fs.openSync(path, 'r')
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

async function md5File (path) {
  const fd = await fsP.open(path, 'r');
  try {
    const buff = Buffer.alloc(BUFFER_SIZE);
    const { buffer } = await fd.read(buff, 0, buff.length, 0);
    const hash = crypto.createHash('md5');
    hash.update(buffer.slice(0, buffer));
    return hash.digest('hex');
  } finally {
    fd.close();
  }
}

module.exports = md5File
module.exports.sync = md5FileSync
