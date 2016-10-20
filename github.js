var sort_event = require("./sort_event");
var Client     = require("github");
var github     = new Client();

github.authenticate({
	    type: "oauth",
	    token: "c6998c4432212b71aa8c135b6e4401079ba4fbd6"
});

function Github(){}

Github.prototype.search_by_city = function( city ){
return new Promise( (resolve, reject)=>{
	let _q = "location:" + city;
	github.search.users({
		q: _q
	}, function(err, res){
		try {
		   var _users = res['items'];
		   let usernames = _users.map( (user) =>{
			   return user["login"];
		   })
		  sort_event.emit("max", usernames.length )
		  resolve( usernames );
			
		} catch (e) {
			resolve([])
		}
	   });
});
}


function get_user_repos ( username, cb ){
	let _q = "language:javascript+user:" + username;
	github.search.repos({
		q: _q
	}, 
	function(err, res){
	   try {
		   var repos = res['items'];
		   cb(repos);
	   } catch (e) {
		   
	   }
		cb([]);
	})

};

Github.prototype.get_stars = function( usernames ){

	usernames.map((username)=>{
		get_user_repos( username, function(repos){
			var user_stars = count_stars( repos, username );
			sort_event.emit("event",  user_stars);
		})
	})
}


function count_stars( repos, username ){
	let stars = repos.map( (repo) =>{
		return repo['stargazers_count'];
	});

	if (repos !== undefined && repos.length > 0){
		let total_stars =  stars.reduce(( prev, curr ) =>{
			return prev + curr;
		});
		return { user : username, stars : total_stars  };
	}
	else{
		return { user : username, stars : 0  };
	}
};

module.exports = new Github();
