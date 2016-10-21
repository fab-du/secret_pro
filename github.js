'use strict';
var sort_event = require('./sort_event');
var Client     = require('github');
var github     = new Client();
var utils      = require('./utils.js');

github.authenticate({
	    type: "oauth",
	    token: "8e11138180d21f4fc8a8618838101613bdad3e41"
});

function Github(){}

Github.prototype.search_by_city = function search_by_city( city, cb ){
	let _q = "location:" + city;
	github.search.users({
		q: _q
	}, function(err, res){
		console.log(res)
		utils.check_cb_error( err, res);

		try {
		   var _users = res['items'];
		   let usernames = _users.map((user)=>{
			   return user["login"];
		   });
		  sort_event.emit("max", usernames.length);
		  cb(null, usernames);
			
		} catch (e) {
			cb(true, []);
		}
	   });

};


function get_user_repos ( username, cb ){
	let _q = "language:javascript+user:" + username;
	github.search.repos({
		q: _q
	}, 
	function(err, res){
	   console.log(res)
	   utils.check_cb_error(err, res);

	   try {
		   var repos = res['items'];
		   //first arg err=false or err=null
		   cb(null, repos);
	   } catch (e) {
	   		//first arg err=false or err=null
	   	   cb(true, [] );
	   }
	});

}

Github.prototype.get_stars = function get_stars( usernames ){

	usernames.map((username)=>{
		get_user_repos( username, function(err, repos){
		if( !err && repos.length > 0 ){
			var user_stars = count_stars( repos, username );
			sort_event.emit("event",  user_stars);
		}
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
