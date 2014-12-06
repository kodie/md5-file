'use strict';

var md5 = require('./index');
var assert = require('assert');

assert.equal(md5('./README.md'), 'fb88aa66d27282070ab60b52301651af');

md5.async('./README.md', function (data) {
  assert.equal(data, 'fb88aa66d27282070ab60b52301651af');
});

md5.async('./README.md', function (data) {
  assert.equal(data, 'fb88aa66d27282070ab60b52301651af');
}, true);

// errors

// non-strict: will pass through an error to `data`
md5.async('./null', function (data) {
  assert.equal(JSON.stringify(data), '{"errno":34,"code":"ENOENT","path":"./null"}');
});
