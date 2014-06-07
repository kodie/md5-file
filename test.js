var md5 = require('./index');

console.log('md5 (1) ' + md5('./README.md'));

md5.async('./README.md', function (data) {
  console.log('md5 (2) ' + data);
});

md5.async('./README.md', function (data) {
  console.log('md5 (3) ' + data);
}, true);

// errors

// non-strict: will pass through an error to `data`
md5.async('./null', function (data) {
  console.log('md5 (4) ' + data);
});

// strict: will throw an error
md5.async('./null', function (data) {
  console.log('md5 (5) ' + data);
}, true);

