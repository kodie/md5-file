# md5-file

### Overview

Simply return an `md5` sum of a given file.

### Installation

```
$ npm install md5-file
```

### Sync

```javascript
var md5 = require('md5-file');

md5('path/to/a_file'); // '18e904aae79b5642ed7975c0a0074936'
```

### Async

```javascript
md5.async('./README.md', function (data) {
  console.log(data);
});

md5.async('./README.md', function (data) {
  console.log(data);
}, true);

// errors

// non-strict: will pass through an error to `data`
md5.async('./null', function (data) {
  console.log(data);
});

// strict: will throw an error
md5.async('./null', function (data) {
  console.log(data);
}, true);
```

