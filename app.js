var github = require("./github.js");
var utils  = require("./utils");

var stdin  = process.argv.toString();
var city   = utils.parser( stdin );

github.search_by_city(city)
.then((users)=>{
	github.get_stars(users);
});
