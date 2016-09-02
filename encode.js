"use strict";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split('');


module.exports = function(str) {

  var out = "", i = 0, len = str.length, c1, c2, c3;
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      out += CHARS[c1 >> 2];
      out += CHARS[(c1 & 0x3) << 4];
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      out += CHARS[c1 >> 2];
      out += CHARS[((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4)];
      out += CHARS[(c2 & 0xF) << 2];
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += CHARS[c1 >> 2];
    out += CHARS[((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4)];
    out += CHARS[((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6)];
    out += CHARS[c3 & 0x3F];
  }
  return out;
};
