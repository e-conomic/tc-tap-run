# TeamCity TAP Runner

This is a little program that runs TAP tests and outputs tests information in TeamCity format.

## Installation

Install with npm

```
npm install -g tc-tap-run
```

Then run your script and pipe the output to the test runner, as in this example.

```
node ./test.js | tc-tap-run
```

Then the test runner will run the test script, parse the stdout and print the corresponding TeamCity information.
