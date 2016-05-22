/* eslint-env mocha */

'use strict'

var md5File = require('./')
var md5FileAsPromised = require('./promise')
var assert = require('assert')

var filename = 'LICENSE.md'
var preCheckedSum = '687d0001c49a6315989af72c0325dff3'

function noop () {}

describe('md5File', function () {
  it('works asynchronously', function (done) {
    md5File(filename, function (err, hash) {
      assert.ifError(err)
      assert.equal(hash, preCheckedSum)

      done()
    })
  })

  it('works synchronously', function () {
    assert.equal(md5File.sync(filename), preCheckedSum)
  })

  it('has proper error handling', function (done) {
    md5File('does not exist', function (err) {
      assert.ok(err)
      assert.equal(err.code, 'ENOENT')

      done()
    })
  })

  it('requires a callback', function () {
    assert.throws(function () { md5File(filename) }, TypeError)
  })

  it('only accepts strings and buffers', function () {
    var invalidValues = [
      [],
      {},
      123,
      null,
      undefined
    ]

    if (typeof Symbol !== 'undefined') {
      invalidValues.push(Symbol('test'))
    }

    invalidValues.forEach(function (value) {
      assert.throws(function () { md5File.sync(value) }, TypeError)
      assert.throws(function () { md5File(value, noop) }, TypeError)
    })
  })

  if (typeof Promise !== 'undefined') {
    it('provides a Promise based api', function () {
      return md5FileAsPromised(filename).then(function (hash) {
        assert.equal(hash, preCheckedSum)
      })
    })
  }
})
