#!/usr/bin/env node
var fs = require('fs');
var cp = require('child_process');
var TapConsumer = require('tap').createConsumer;
var tc = TapConsumer();

var cli = process.argv[2].split(' ');
var child = cp.spawn(cli[0], cli.slice(1));

child.stdout.pipe(tc);
child.stdout.on('end', function() {
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
