'use strict';
var sort_event = require('./sort_event');
var Client     = require('github');
var github     = new Client();
var utils      = require('./utils.js');

github.authenticate({
	    type: "oauth",
	    token: "d3fb84c3412f2a20f8ef33a58fc11019e7164305"
});

function Github(){}

Github.prototype.search_by_city = function search_by_city( city ){
return new Promise((resolve )=>{
	let _q = "location:" + city;
	github.search.users({
		q: _q
	}, function(err, res){
		utils.check_cb_error( err, "Github API Issue" );

		if( utils.check_cb_undefined( res )){
			utils.error("No Users In the City. \n" );
		}

		try {
		   var _users = res['items'];
		   let usernames = _users.map((user)=>{
			   return user["login"];
		   });
		  sort_event.emit("max", usernames.length);
		  resolve(usernames);
			
		} catch (e) {
			resolve([]);
			utils.error("From users" + e.toString());
		}
	   });
});
};


function get_user_repos ( username, cb ){
	let _q = "language:javascript+user:" + username;
	github.search.repos({
		q: _q
	}, 
	function(err, res){
	   utils.check_cb_error( err, "Github API Issue." );
	   try {
		   var repos = res['items'];
		   cb(repos);
	   } catch (e) {
		   cb([]);
	   }
	});

}

Github.prototype.get_stars = function get_stars( usernames ){

	usernames.map((username)=>{
		get_user_repos( username, function(repos){
			var user_stars = count_stars( repos, username );
			sort_event.emit("event",  user_stars);
		});
	});
};


function count_stars( repos, username ){
	let stars = repos.map( (repo) =>{
		return repo['stargazers_count'];
	});

	if (repos !== undefined && repos.length > 0){
		let total_stars = stars.reduce((prev, curr)=>{
			return prev + curr;
		});
		return { user : username, stars : total_stars  };
	}
	else{
		return { user : username, stars : 0  };
	}
}

module.exports = new Github();
