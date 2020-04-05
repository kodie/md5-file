/* eslint-env mocha */

const md5File = require('./')
const assert = require('assert')

const filename = 'LICENSE.md'
const preCheckedSum = 'ad1faf9381e43c471dc381c17a4ee4b6'

describe('md5File', () => {
  it('works asynchronously', async () => {
    const hash = await md5File(filename)
    assert.strictEqual(hash, preCheckedSum)
  })

  it('works synchronously', () => {
    assert.strictEqual(md5File.sync(filename), preCheckedSum)
  })

  it('has proper error handling', async () => {
    await assert.rejects(md5File('does not exist'), (err) => err.code === 'ENOENT')
  })

  it('only accepts strings and buffers', async () => {
    var invalidValues = [
      [],
      {},
      123,
      null,
      undefined,
      Symbol('test')
    ]

    for (const value of invalidValues) {
      assert.throws(() => { md5File.sync(value) }, TypeError)
      await assert.rejects(md5File(value), TypeError)
    }
  })
})
