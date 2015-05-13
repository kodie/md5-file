'use strict'

var md5File = require('./index')
var assert = require('assert')
var filename = 'LICENSE.md'
var preCheckedSum = '79069e31e6722533f772a4ca5de984e4'

md5File(filename, function (error, sum) {
  console.log('sum = ' + sum)
  assert(error === null)
  assert(sum === preCheckedSum)
  console.log('Pass 2/2')
})

var syncSum = md5File(filename)

assert(syncSum === preCheckedSum)
console.log('sum = ' + syncSum)
console.log('Pass 1/2')
