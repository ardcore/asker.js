asker asks questions in the console, grabs responses and returns them as an object.
it can be used in various generators of config files, interactive modes etc.

questions should be passed as array of object, each described using the following format:

`{ topic: 'sex', question: 'What is your sex?', options: ['male', 'female'], default: 'male', mandatory: true }`

where `topic` will become key of the returned object, `question` is merely question displayed, `options` - if present - enforce the possible answer to be one of them. `default` and `mandatory` are probably obvious.

bare minimum: `{ topic: 'hello', question: 'how are you?' }`
 
after all questions are answered, callback function is invoked.
example:

`asker.ask(questionsArray, function(err, data) {
	if (err) throw err;
	console.log(data);
})`

will return something like:
`{ name: 'User', age: '55', sex: 'male' }`

TODO: regexp validation, callbacks per each question, better options support ((M)ale, (F)emale?), bulletproofing (default not in options etc), some real error handling
