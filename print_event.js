'use strict';
var EventEmitter = require('events');

class PrintEvent extends EventEmitter {}
const printEvent = new PrintEvent();

printEvent.on("print", ( best_coders )=>{

	printColor("Best javascript Coder: \n");
	best_coders.map((coder)=>{
		printColor(coder['user'] + ": " + coder['stars']);
	});
});

function printColor( message ){
	console.log('\x1b[36m', message ,'\x1b[0m');
}

module.exports = printEvent; 
