# TeamCity TAP Runner

This is a little program that runs TAP tests and outputs tests information in TeamCity format.

## Installation

Install with npm

```
npm install -g tc-tap-run
```

Then run the tap runner and pass your tests script as in this example.

```
tc-tap-run "node ./test.js"
```

Then the test runner will run the test script, parse the stdout and print the corresponding TeamCity information.
