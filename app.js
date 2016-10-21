var github = require('./github.js');
var utils  = require('./utils');
var error_handler = require('./errors.js');

var stdin  = process.argv.toString();
var city   = utils.parser( stdin );

if( city === null ){
	error_handler.emit("argserror");
}
else{
	github.search_by_city(city, ( err, users)=>{
		if( err || users.length === 0 ){
			error_handler.emit("nousers")
		}
		
		github.get_stars(users);
	})
}

