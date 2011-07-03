#!/usr/bin/env node

var sys = require('sys');

var results;

function isInArray(needle, arr) {
	return (arr.indexOf(needle) != -1);
}

function askQuestionFromIndex(current, questions) {
	askQuestionFromIndex = function(current) {
		var q = questions[current];
		q = stabilizeQuestion(q, ['callback', 'check'], results);
		printQuestion(current + 1, q);
	}
	return askQuestionFromIndex(current);
}

function stabilizeQuestion(question, exceptionList, results) {
	for (var i in question) {
		if (question.hasOwnProperty(i) && typeof question[i] == 'function' && !isInArray(i, exceptionList)) {
			question[i] = question[i](results);
		}
	}
	return question;
}

function handleResponse(chunk, current, questions, cb) {
	handleResponse = function(chunk) {
		var q = questions[current];
		chunk = chunk.trim() || q.default || "";
		var mandatoryFulfilled = (!q.mandatory || chunk.length != 0);
		var optionsFulfilled = (!q.options || isInArray(chunk, q.options));
		var checkFulfilled = (!q.check || q.check(chunk, results, current));
		if (mandatoryFulfilled && optionsFulfilled && checkFulfilled) {
			q.callback && q.callback(chunk, results, current);
			current++;
			results[q.topic] = chunk;
			if (current < questions.length) {
				askQuestionFromIndex(current);
			} else {
				process.stdin.pause();
				cb(null, results);
			}
		} else {
			process.stdout.write("\tInvalid input, try again.\n");
			askQuestionFromIndex(current);
		}
	}
	return handleResponse(chunk);
}

function ask(questions, cb) {
	var current = 0;
	results = {};
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	askQuestionFromIndex(current, questions);
	process.stdin.on('data', function (chunk) {
		handleResponse(chunk, current, questions, cb);	
	});
}

function printQuestion(index, q) {
	var bundle = [];
	bundle.push(index + ". ");
	bundle.push(q.question + " ");
	if (q.options) bundle.push("["+q.options.join("/")+"]");
	if (q.default) bundle.push("[default:"+q.default+"]");
	if (q.mandatory) bundle.push("(*)");
	bundle.push(' ');
	bundle = bundle.join('');
	process.stdout.write(bundle);
}

function getAnswer(topic) {
	return results[topic];
}
exports.getAnswer = getAnswer;
exports.ask = ask;
