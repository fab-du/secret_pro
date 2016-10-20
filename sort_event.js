var EventEmitter = require('events');

class SortEvent extends EventEmitter {}
const sortEvent = new SortEvent();

var max = 0;
var users = [];
var _counter=0;

sortEvent.on("event", (user_and_star)=>{
	users.push(user_and_star);
	users=users.sort( ( prev, curr )=>{
		return curr['stars'] - prev['stars'];
	});
	++_counter;

	if( max === _counter ){
		console.log(users);
		console.log(users[0], users[1], users[2]);
	}
});

sortEvent.on("max", (max_users)=>{
	max = max_users;
});


module.exports = sortEvent;
