/* eslint-env mocha */

'use strict'

const md5File = require('./')
const assert = require('assert')
const assertRejects = require('assert-rejects')

const filename = 'LICENSE.md'
const preCheckedSum = 'ad1faf9381e43c471dc381c17a4ee4b6'

describe('md5File', function () {
  it('works asynchronously', function () {
    return md5File(filename).then((hash) => {
      assert.equal(hash, preCheckedSum)
    })
  })

  it('works synchronously', function () {
    assert.equal(md5File.sync(filename), preCheckedSum)
  })

  it('has proper error handling', function () {
    return assertRejects(md5File('does not exist'), (err) => err.code === 'ENOENT')
  })

  it('only accepts strings and buffers', function () {
    var invalidValues = [
      [],
      {},
      123,
      null,
      undefined,
      Symbol('test')
    ]

    invalidValues.forEach((value) => {
      assert.throws(() => { md5File.sync(value) }, TypeError)
    })

    return invalidValues.map((value) => {
      return assertRejects(md5File(value), TypeError)
    })
  })
})
