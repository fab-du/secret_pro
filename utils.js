'use strict';
const path         = require('path');
const errorHandler = require('./errors');


module.exports={
parser : function parser( stdin ){
	var commands = stdin.split(",");
	var programm_name = path.basename(__filename);

	if( commands.length !== 3  ){
		return null;
	}

	return commands[commands.length -1];
},

error : function error( error_message ){
	errorHandler.emit("error", error_message );
},

check_cb_error : function check_cb_error( err, error_message ){
	if(err){
		errorHandler.emit("\n error", error_message + "\n" + err.message.message );
	}
},

check_cb_undefined: function check_cb_undefined( data ){
	if( typeof data != 'undefined' && data ){
		return false;
	}
	return true;
}

};
