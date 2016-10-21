var EventEmitter = require("events")
var chai = require('chai');
var utils = require('../utils.js')
var error_handler = require('../errors.js');

var expect = chai.expect;

const STDIN_NO_ARG="node,index.js"

describe('Utils', function(){
	it("#parse() should return null if no arguments/programm exits", function(){
		var city = utils.parser(STDIN_NO_ARG);
		expect( city ).to.equal(null);
	});

})
