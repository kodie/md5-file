# md5-file [![Build Status](https://travis-ci.org/roryrjb/md5-file.svg?branch=master)](https://travis-ci.org/roryrjb/md5-file) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

> Simply return an `md5` sum of a given file. If using async version (by including callback), it will stream; successfully tested on files 4 GB+.

### Installation

```
$ npm install md5-file
```

__Test:__

```
$ npm test
```

### API

__md5File(path, [callback])__

```javascript
var md5File = require('md5-file')

// sync (no callback)

md5File('./path/to/a_file') // '18e904aae79b5642ed7975c0a0074936'

// async/streamed (if using callback)

md5File('./path/to/a_file', function (error, sum) {
  if (error) return console.log(error)
  console.log(sum) // '18e904aae79b5642ed7975c0a0074936'
})
```

### License

MIT
