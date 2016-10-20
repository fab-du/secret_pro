var EventEmitter = require('events');

class SortEvent extends EventEmitter {}
const sortEvent = new SortEvent();

var max = 0;
var users = [];

sortEvent.on("event", (user_and_star)=>{
	users.push(user_and_star);
	users.sort( ( prev, curr )=>{
		return curr['stars'] - prev['stars'];
	});

	if( max === 30 )
		console.log(users[0], users[1], users[2]);
});

sortEvent.on("max", (max_users)=>{
	max = max_users;
})


module.exports = sortEvent;
