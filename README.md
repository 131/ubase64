# Base64 encoder/decoder for nodejs or the browser, with minimal footprint

# Api 

```
var b64 = require('ubase64');
var encode = b64.encode;
var decode = b64.decode;

console.log(decode(encode("this is bar")) == "this is bar");

//minimal module export usage
var encode = require('ubase64/encode');
var decode = require('ubase64/decode');

```

# Notes
* full code coverage
* minimal footprint for rollup/browserify
* **sane API**

[![Build Status](https://travis-ci.org/131/ubase64.svg?branch=master)](https://travis-ci.org/131/ubase64)
[![Coverage Status](https://coveralls.io/repos/github/131/ubase64/badge.svg?branch=master)](https://coveralls.io/github/131/ubase64?branch=master)
