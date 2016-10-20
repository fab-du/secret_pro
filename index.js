
const GITHUB_API_LINK = "https://api.github.com"
const GITHUB_API_LINK_SEARCH = "https://api.github.com/search/users?q=location:${cityname}" 

var Client = require('node-rest-client').Client;
 

var log = console.log

var cityname = process.argv[2]
var pwd = process.cwd()

const EventEmitter = require('events');

class SortEvent extends EventEmitter {}
class PrintEvent extends EventEmitter {}
const printEvent = new PrintEvent();
const sortEvent = new SortEvent();

var userLists=[];
sortEvent.on('sortevent', ( data ) => {
	userLists.push( data );
	userLists.sort( ( prev, curr )=>{
		return curr['stars'] - prev['stars'];
	});
	console.log( userLists )
});

printEvent.on('printevent', ()=>{
	console.log( userLists );
});


function search_user_in_city( cityname, cb ){
	let client = new Client();
	let _searchQuery =   GITHUB_API_LINK_SEARCH + cityname;

	var args = {
		headers: { "Content-Type": "application/json", "Accept": "application/vnd.github.v3+json", "User-Agent" : "RANKING-APP"}
	};

	client.get( "https://api.github.com/search/users?q=location:" + cityname + "+language:javascript", args,  ( data, res ) =>{
		try {
			var _users = data['items']

			if( _users !== undefined ){
				let usernames = _users.map( (el) => {
					return el['login'];
				});
				cb( usernames ) 
			}
			cb([]);
			
		} catch (e) {
			console.log( e );
			/* handle error */
		}
	});
	
}

function search_js_repos_for_user( username,cb ){
	let client = new Client();
	var args = {
		headers: { "Content-Type": "application/json", "Accept": "application/vnd.github.v3+json", "User-Agent" : "RANKING-APP"}
	};
	client.get("https://api.github.com/search/repositories?q=language:javascript+user:" + username, args, ( data, res ) =>{
		try {
			if ( typeof data !== undefined && data["total_count"] >0 )
			{
				let repos = data.items;
				let user_stars = count_stars( repos, username );
				if ( user_stars['stars'] > 0 ){
					cb( user_stars )
				}
			}
		} catch (e) {
			log( e );
		}
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
}

search_user_in_city( cityname, ( usernames) => {
	usernames.map( ( username, i ) =>{
		if( i < usernames.length-1 ){
			search_js_repos_for_user( username, ( user_stars )=>{
				sortEvent.emit( "event", user_stars );
			});
		}
		else{
			printEvent.emit("event");
		}
	});
});


