'use strict'

var md5File = require('./index')
var assert = require('assert')
var filename = 'LICENSE.md'
var preCheckedSum = 'a06f55ab67333b93e8edebff0ae86027'

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
