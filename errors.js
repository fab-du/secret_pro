var EventEmitter = require('events');
class ErrorHandler extends EventEmitter {}
const errorHandler = new ErrorHandler();


process.on("uncaughtException", err=>{
	console.log("error not catched");
});

process.on('SIGINT', function() {  
     console.log( "\n Thank you for using the APP \n BYE!!!" );
      process.exit(0); 
});

errorHandler.on('error', err=>{
	console.log("ERROR: " + err.toString());
	process.exit(1);
});

module.exports = errorHandler; 
