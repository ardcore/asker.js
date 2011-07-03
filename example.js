var asker = require('./asker.js');

var q = [
	{ topic: 'name', question: 'What is your name?', mandatory: true },
	{ topic: 'age', question: '... and you are?', default: 'developer' },
	{ topic: 'sex', question: 'What is your sex?', options: ['male', 'female'], mandatory: true },
	{ topic: 'age', question: 'And your age?', mandatory: true, check: function(answer) { return answer > 10 && answer < 90 } },
	{ topic: 'hobby', question: 'What\'s your hobby?', callback: function(data) { console.log("Your hobby is", data || " nowhere", ", how cool!")}},
	{ topic: 'name_correct', question: function(data) { return "is your name really " + data.name + "?" }, options: ['yes', 'no'], mandatory: true }
]
asker.ask(q, function(err, data) {
	if (err) throw err;
	console.log(data);
})

