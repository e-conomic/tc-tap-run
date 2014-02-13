#!/usr/bin/env node
var fs = require('fs');
var cp = require('child_process');
var TapConsumer = require('tap').createConsumer;
var tc = TapConsumer();

var cli = process.argv[2].split(' ');
var child = cp.spawn(cli[0], cli.slice(1));

child.stdout.pipe(tc);
child.stdout.on('end', function() {
	console.log(tc.results.list);
	console.log("##teamcity[testSuiteStarted name='TAP test suite']");
	tc.results.list.forEach(function(test) {
		console.log("##teamcity[testStarted name='" + test.name + "' captureStandardOutput='true']");
		if (test.ok) {
			console.log("##teamcity[testFinished name='" + test.name + "' ]");
		} else {
			console.log("##teamcity[testFailed name='" + test.name + "' captureStandardOutput='true']");
		}
	});
	console.log("##teamcity[testSuiteFinished name='TAP test suite']");
});
