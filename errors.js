var EventEmitter = require('events');

class ErrorHandler extends EventEmitter {}
const errorHandler = new ErrorHandler();

const ERROR_WRONG_ARGUMENT = "error. Wrong arguments. \n Use Case: node index.js cityname \n";
const ERROR_GITHUB_API     = "GITHUB API ERROR: \n";
const ERROR_NO_USER        = "\n NO users in the given city \n";


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

errorHandler.on('nousers', ()=>{
	console.log( ERROR_NO_USER )	
	process.exit(1);
});

errorHandler.on('githuberror', (err)=>{
	console.log( ERROR_GITHUB_API + err )	
	console.log( err );
	process.exit(1);
});

errorHandler.on('argserror', ()=>{
	console.log( ERROR_WRONG_ARGUMENT );
	process.exit(1);
});

module.exports = errorHandler; 
