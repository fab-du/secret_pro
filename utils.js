var path = require("path");
var errorHandler = require('./errors')


module.exports ={
parser : function parser( stdin ){
	var commands = stdin.split(",");
	var programm_name = path.basename(__filename);

	if( commands.length != 3  ){
		errorHandler.emit("error", "Wrong arguments. \nUse Case: node " + programm_name + " cityname");
	}

	return commands[commands.length -1];
}

}	
