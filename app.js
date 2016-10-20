var github = require("./github.js")
var path =  require("path")


var utils = require("./utils");

var stdin = process.argv.toString();
var city = utils.parser( stdin );
console.log( city );


github.search_by_city("Mannheim")
.then( (users) =>{
	console.log(users)
	github.get_stars( users );
})
