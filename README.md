asker asks questions in the console, grabs responses and returns them as an object.
it can be used in various config generators, makefiles, interactive modes etc.

questions should be passed as array of object, each described using the following format:

`{ topic: 'sex', question: 'What is your sex?', options: ['male', 'female'], default: 'male', mandatory: true }`

in more detail: 

 * `topic` (string/function) will become key of the returned object,
 * `question` (string/function) is merely question displayed, 
 * `options` (array) - if present - enforce the possible answer to be one of them, 
 * `def` (string/function) is a default value if no answer is given,
 * `mandatory` (boolean) prevents going to next question without any answer.

each of these fields can be a function - in such case, this function gets
invoked just before given question is asked, and field's value becomes equal 
to the return value of invoked function.
(see example.js for more detail)

we also have two callbacks:

 * `check` (function) is a custom validation function,
 * `callback` (function) is called after recieving valid answer

you don't need to use all of these attributes. bare minimum is simple: `{ topic: 'hello', question: 'how are you?' }`
 
after all questions are answered, callback function is invoked.
example:

`var questionsArray = [
  { topic: 'name', question: 'What is your name?' },
  { topic: 'lastname', question: 'What is your last name?', mandatory: true }
]

asker.ask(questionsArray, function(err, data) {
	if (err) throw err;
	console.log(data);
})`

will output to the console something like:
`{ name: 'Szymon', lastname: 'Pilkowski' }`

TODO:  better options support ((M)ale, (F)emale?), bulletproofing (default not in options etc), some real error handling, subquestions, refactor, tests
