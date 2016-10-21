var EventEmitter = require("events")
var chai = require('chai');
var utils = require('../utils.js')
var error_handler = require('../errors.js');
var github = require("../github");

var expect = chai.expect;

const STDIN_NO_ARG="node,index.js"
const CITY="MAnnheim";

describe('Utils', function(){
	it(".parse() should return null if no arguments/programm exits", function(){
		var city = utils.parser(STDIN_NO_ARG);
		expect( city ).to.equal(null);
	});

});


describe('GithubClient', function(){
	it(".search_by_city() should return user from a given city with JavaScript Repos", function(){
		github.search_by_city( CITY )
		.then( (users)=>{
			expect(users).to.not.equal(null);
		});
	});
})
