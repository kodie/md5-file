# md5-file [![Build Status](https://travis-ci.org/roryrjb/md5-file.svg?branch=master)](https://travis-ci.org/roryrjb/md5-file)

> Simply return an `md5` sum of a given file.

### Installation

```
$ npm install md5-file
```

__Test:__

```
$ npm test
```

### API

_Sync:_

__md5File(path)__

```javascript
var md5File = require('md5-file');

md5File('path/to/a_file'); // '18e904aae79b5642ed7975c0a0074936'
```

_Async:_

__md5File(path, callback, [strict])__

If _strict_ is `true` and there is an error it will `throw` it, otherwise it will pass an error string through the callback.

```javascript
md5File.async('./README.md', function (data) {
  console.log(data);
});

md5File.async('./README.md', function (data) {
  console.log(data);
}, true);

// errors

// non-strict: will pass through an error to `data`
md5File.async('./null', function (data) {
  console.log(data);
});

// strict: will throw an error
md5File.async('./null', function (data) {
  console.log(data);
}, true);
```

### License

MIT
