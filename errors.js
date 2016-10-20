var EventEmitter = require('events');

class ErrorHandler extends EventEmitter {}
const errorHandler = new ErrorHandler();


process.on("uncaughtException", (err)=>{
	console.log("error not catched");
	console.warn(err.toString());
	process.exit(1);
});

process.on('SIGINT', function() {  
     console.log( "\n Thank you for using the APP \n BYE!!!" );
      process.exit(0); 
});

errorHandler.on('error', (err)=>{
	console.warn(err);
	console.log("ERROR: " + err.toString());
	process.exit(1);
});

module.exports = errorHandler; 
