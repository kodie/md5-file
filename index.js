'use strict';

var crypto = require('crypto');
var fs = require('fs');

module.exports = function (filename) {
  var sum = crypto.createHash('md5');
  sum.update(fs.readFileSync(filename));
  return sum.digest('hex');
};

// if `strict` then throw error otherwise pass error through
module.exports.async = function (filename, callback, strict) {
  fs.readFile(filename, function (error, data) {
    if (error) {
      if (strict) {
        throw new Error(error);
      }
      return callback(error);
    }
    var sum = crypto.createHash('md5');
    sum.update(data);
    return callback(sum.digest('hex'));
  });
};
