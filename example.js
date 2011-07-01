var asker = require('./asker.js');

var q = [
	{ topic: 'name', question: 'What is your name?', mandatory: true, default: 'User' },
	{ topic: 'age', question: 'How old are you?' },
	{ topic: 'sex', question: 'What is your sex?', options: ['male', 'female'], mandatory: true }
]
asker.ask(q, function(err, data) {
	if (err) throw err;
	console.log(data);
})

