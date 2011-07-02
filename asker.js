#!/usr/bin/env node

var sys = require('sys');

var results;

function isInArray(needle, arr) {
	return (arr.indexOf(needle) != -1);
}

function askQuestionFromIndex(current, questions) {
	askQuestionFromIndex = function(current) {
		var q = questions[current];
		printQuestion(current + 1, q);
	}
	return askQuestionFromIndex(current);
}


function handleResponse(chunk, current, questions, cb) {
	handleResponse = function(chunk) {
		var q = questions[current];
		chunk = chunk.trim() || q.default || "";
		var mandatoryFulfilled = (!q.mandatory || chunk.length != 0);
		var optionsFulfilled = (!q.options || isInArray(chunk, q.options));
		if (mandatoryFulfilled && optionsFulfilled) {
			current++;
			results[q.topic] = chunk;
			if (current < questions.length) {
				askQuestionFromIndex(current);
			} else {
				process.stdin.pause();
				cb(null, results);
			}
		} else {
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
exports.ask = ask;

