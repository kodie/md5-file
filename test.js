'use strict';

var md5 = require('./index');
var assert = require('assert');

assert.equal(md5('./LICENSE.md'), '79069e31e6722533f772a4ca5de984e4');

md5.async('./LICENSE.md', function (data) {
  assert.equal(data, '79069e31e6722533f772a4ca5de984e4');
});

md5.async('./LICENSE.md', function (data) {
  assert.equal(data, '79069e31e6722533f772a4ca5de984e4');
}, true);

// errors

// non-strict: will pass through an error to `data`
md5.async('./null', function (data) {
  assert.equal(data.code, 'ENOENT');
});
