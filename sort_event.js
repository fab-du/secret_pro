var EventEmitter = require('events');
var print_event = require('./print_event');

class SortEvent extends EventEmitter {}
const sortEvent = new SortEvent();

var max = 0;
var users = [];
var _counter=0;

const RANG=2

sortEvent.on("event", (user_and_star)=>{
	users.push(user_and_star);
	users=users.sort( ( prev, curr )=>{
		return curr['stars'] - prev['stars'];
	});
	++_counter;

	if( max === _counter ){
		print_event.emit("print", users.slice(0, RANG));
	}
});

sortEvent.on("max", (max_users)=>{
	max = max_users;
});


module.exports = sortEvent;
