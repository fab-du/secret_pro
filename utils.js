'use strict';
const path         = require('path');
const errorHandler = require('./errors');


module.exports={
parser : function parser( stdin ){
	var commands = stdin.split(",");
	var programm_name = path.basename(__filename);

	if( commands.length !== 3  ){
		errorHandler.emit("error", "Wrong arguments. \nUse Case: node " + programm_name + " cityname");
	}

	return commands[commands.length -1];
},
error : function error( error_message ){
	errorHandler.emit("error", error_message );
},
check_cb_error : function check_cb_error( err, message ){
	if(err){
		this.error( message );
	}
}

};
