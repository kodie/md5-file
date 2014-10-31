# md5-file

[![NPM](https://nodei.co/npm-dl/md5-file.png?months=6)](https://nodei.co/npm/md5-file/)

### Overview

Simply return an `md5` sum of a given file.

### Installation

```
$ npm install md5-file
```

### API

_Sync:_

__md5file(path)__

```javascript
var md5file = require('md5-file');

md5file('path/to/a_file'); // '18e904aae79b5642ed7975c0a0074936'
```

_Async:_

__md5file(path, callback, [strict])__

If _strict_ is `true` and there is an error it will `throw` it, otherwise it will pass an error string through the callback.

```javascript
md5file.async('./README.md', function (data) {
  console.log(data);
});

md5file.async('./README.md', function (data) {
  console.log(data);
}, true);

// errors

// non-strict: will pass through an error to `data`
md5file.async('./null', function (data) {
  console.log(data);
});

// strict: will throw an error
md5file.async('./null', function (data) {
  console.log(data);
}, true);
```

