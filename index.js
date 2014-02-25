#!/usr/bin/env node
var fs = require('fs');
var TapConsumer = require('tap').createConsumer;
var tc = TapConsumer();

process.stdin.pipe(tc);
process.stdin.on('end', function() {
	console.log("##teamcity[testSuiteStarted name='TAP test suite']");
	tc.results.list.forEach(function(test) {
		console.log("##teamcity[testStarted name='" + escape(test.name) + "' captureStandardOutput='true']");
		if (test.ok) {
			console.log("##teamcity[testFinished name='" + escape(test.name) + "' ]");
		} else {
			console.log("##teamcity[testFailed name='" + escape(test.name) + "' message='"+escape(test.stack.toString())+"' captureStandardOutput='true']");
		}
	});
	console.log("##teamcity[testSuiteFinished name='TAP test suite']");
});

function escape(str) {
	if (!str) return '';
	return str
		.replace(/\|/g, "||")
		.replace(/\n/g, "|n")
		.replace(/\r/g, "|r")
		.replace(/\[/g, "|[")
		.replace(/\]/g, "|]")
		.replace(/\u0085/g, "|x")
		.replace(/\u2028/g, "|l")
		.replace(/\u2029/g, "|p")
		.replace(/'/g, "|'");
}
