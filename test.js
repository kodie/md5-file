'use strict'

var md5File = require('./index')
var assert = require('assert')
var filename = 'LICENSE.md'
var preCheckedSum = '687d0001c49a6315989af72c0325dff3'

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

// errors

md5File('does not exist', function (error, sum) {
  assert(error)
  assert(!sum)
})
