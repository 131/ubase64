# Base64 encoder/decoder for nodejs or the browser, with minimal footprint

# Api 

```
var encode = require('ubase64').encode;
var decode = require('ubase64').decode;

console.log(decode(encode("this is bar")) == "this is bar");

//minimal usage
var encode = require('ubase64/encode');
var decode = require('ubase64/decode');

```
