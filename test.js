/* eslint-env mocha */

'use strict'

var md5File = require('./')
var assert = require('assert')

var filename = 'LICENSE.md'
var preCheckedSum = '687d0001c49a6315989af72c0325dff3'

describe('md5File', function () {
  it('works asynchronously', function (done) {
    md5File(filename, function (err, hash) {
      assert.ifError(err)
      assert.equal(hash, preCheckedSum)

      done()
    })
  })

  it('works synchronously', function () {
    var actual = md5File(filename)

    assert.equal(actual, preCheckedSum)
  })

  it('has proper error handling', function (done) {
    md5File('does not exist', function (err) {
      assert.ok(err)
      assert.equal(err.code, 'ENOENT')

      done()
    })
  })
})
