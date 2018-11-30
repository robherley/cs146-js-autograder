#!/usr/bin/env node
const path = require('path');
const puppeteer = require('puppeteer');
const chalk = require('chalk');
const fse = require('fs-extra');
const ora = require('ora')();

const { insertData, evaluateData, testHover } = require('../src/tests');

let totalPoints = 27;

(async () => {
   const log = color => string => console.log(chalk[color](string));
   if (process.argv.length !== 3) {
      log('yellow')('Usage: js-grader <assignment.js>');
      process.exit(1);
   }
   const JS_FILE = path.join(process.cwd(), process.argv[2]);
   if (await fse.pathExists(JS_FILE)) {
      log('yellow')(`Loading: ${JS_FILE}`);
   } else {
      log('red')(`File not found: ${JS_FILE}`);
      process.exit(1);
   }
   ora.start('Launching Test Environment...');
   const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null
   });
   const page = await browser.newPage();
   page.on('pageerror', err => {
      log('red')(`Page Error: ${err}`);
      if (totalPoints !== 7) {
         log('red')('(-4 Points)');
         totalPoints -= 4;
      }
   });
   await page.goto(`file:${path.join(__dirname, '../src/static/index.html')}`);
   ora.succeed('Testing Page Loaded!');
   await page.addScriptTag({
      path: JS_FILE
   });
   await insertData(page);
   totalPoints += await evaluateData(page);
   totalPoints += await testHover(page);
   log('magenta')(`Final Grade: ${totalPoints}`);
   log('yellow')('Press any key to exit...');
   process.stdin.setRawMode(true);
   process.stdin.resume();
   process.stdin.on('data', async () => {
      await browser.close();
      process.exit(0);
   });
})().catch(async err => {
   ora.fail(`Crashed: Total Points so far: ${totalPoints}`);
   console.error(err);
   process.exit(1);
});
