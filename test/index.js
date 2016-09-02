"use strict";

const expect = require('expect.js');

const encode = require('../encode');
const decode = require('../decode');


var b2str = function(buf){
  return String.fromCharCode.apply('', buf);
}
describe("main test suite", function(){

  it("should test base functionnality", function(){
    var tests = ['a',   'aa',   'aaa',   'hi',   'hi!',   'hi!!',   'sup',   'sup?', 'sup?!' ];

    tests.forEach(function(body ) { 
      expect( b2str( decode(encode(body) ) )).to.eql(body);
    });
  });

  it("should throw on error", function(){
    expect( function(){ decode( "melon$") } ).to.throwError(/Corrupted base64 string/);
  });


  it("should speak the truth for the README.md demo", function(){

    expect( b2str( decode(encode("this is bar")) ) ) .to.eql ("this is bar");
  });
});