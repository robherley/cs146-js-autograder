# CS-146 Assignment 4 Autograder

This is meant to be installed as a global npm package:

```
npm i -g git+https://github.com/robherley/cs146-js-autograder
```

Once installed, open a student's assignment and run the following:

```
js-grader <name of submission>.js
```

This will launch a chrome puppeteer window. It will attempt to grade the assignment by injecting the `solution.js` file. It will report the points scored (or deducted) on the assignment.

The autograder isn't perfect, so be sure to manually look it over too. Feel free to open a PR if ya want.
