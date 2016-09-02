"use strict";

const base64Pad = '=';
const toBinaryTable = [
    -1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,-1,
    -1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,-1,
    -1,-1,-1,-1, -1,-1,-1,-1, -1,-1,-1,62, -1,-1,-1,63,
    52,53,54,55, 56,57,58,59, 60,61,-1,-1, -1, 0,-1,-1,
    -1, 0, 1, 2,  3, 4, 5, 6,  7, 8, 9,10, 11,12,13,14,
    15,16,17,18, 19,20,21,22, 23,24,25,-1, -1,-1,-1,-1,
    -1,26,27,28, 29,30,31,32, 33,34,35,36, 37,38,39,40,
    41,42,43,44, 45,46,47,48, 49,50,51,-1, -1,-1,-1,-1
];


module.exports = function (data) {

  var offset = 0;

  var result, result_length;
  var leftbits = 0; // number of bits decoded, but yet to be appended
  var leftdata = 0; // bits decoded, but yet to be appended
  var data_length = data.indexOf('=') - offset;

  if (data_length < 0) { data_length = data.length - offset; }

  /* Every four characters is 3 resulting numbers */
  result_length = (data_length >> 2) * 3 + Math.floor((data_length % 4) / 1.5);
  result = new Array(result_length);

  // Convert one by one.
  for (var idx = 0, i = offset; i < data.length; i++) {
      var c = toBinaryTable[data.charCodeAt(i) & 0x7f];
      var padding = (data.charAt(i) === base64Pad);
      // Skip illegal characters and whitespace
      if (c === -1) {
          console.error("Illegal character code " + data.charCodeAt(i) + " at position " + i);
          continue;
      }
    
      // Collect data into leftdata, update bitcount
      leftdata = (leftdata << 6) | c;
      leftbits += 6;

      // If we have 8 or more bits, append 8 bits to the result
      if (leftbits >= 8) {
          leftbits -= 8;
          // Append if not padding.
          if (!padding) {
              result[idx++] = (leftdata >> leftbits) & 0xff;
          }
          leftdata &= (1 << leftbits) - 1;
      }
  }

  // If there are any bits left, the base64 string was corrupted
  if (leftbits)
      throw Error('Corrupted base64 string');

  return result;
}

