# CS-146 Assignment 3 Autograder

This is meant to be installed as a global npm package:

```
npm i -g git+https://github.com/robherley/cs146-js-autograder
```

Once installed, open a student's assignment and run the following:

```
js-grader assignment.js
```

This will launch a local server on port `1337`, as well as a pupeteer window. It
will attempt to grade the assignment by injecting the `assignment.js` file. It
will report the points scored (or deducted) on the assignment.

The autograder isn't perfect, so be sure to manually look it over too. Feel free
to open a PR if ya want.
