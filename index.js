
const GITHUB_API_LINK = "https://api.github.com"
const GITHUB_API_LINK_SEARCH = "https://api.github.com/search/users?q=location:${cityname}" 


var Client = require('node-rest-client').Client;
 
var client = new Client();



var cityname = process.argv[2]
var pwd = process.cwd()


function search_user_in_city( cityname, cb ){
	let _searchQuery =   GITHUB_API_LINK_SEARCH + cityname;

	var args = {
		headers: { "Content-Type": "application/json", "Accept": "application/vnd.github.v3+json", "User-Agent" : "RANKING-APP"}
	};

	client.get( "https://api.github.com/search/users?q=location:" + cityname + "+language:javascript", args,  ( data, res ) =>{
		let usernames = data.items.map( (el) => {
			return el['login'];
		});
		cb( usernames ) 
	});
	
}



search_user_in_city( cityname, ( result) => {
	console.log( result )
});



