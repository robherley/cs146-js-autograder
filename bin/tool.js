#!/usr/bin/env node
const puppeteer = require('puppeteer');
const chalk = require('chalk');
const fse = require('fs-extra');
const path = require('path');
const { insertData, evaluateData, testHover } = require('../src/tests');
const serve = require('serve');
const server = serve(path.join(__dirname, '../src/static/'), {
	port: 1337
});

let totalPoints = 20;

(async () => {
	if (process.argv.length !== 3) {
		console.log(chalk.yellow('Usage: js-grader <assignment.js>'));
		process.exit(1);
	}
	const JS_FILE = `${process.cwd()}/${process.argv[2]}`;
	if (await fse.pathExists(JS_FILE)) {
		console.log(chalk.yellow(`Loading: ${JS_FILE}`));
	} else {
		console.log(chalk.red(`File not found: ${JS_FILE}`));
		process.exit(1);
	}
	console.log(
		chalk.yellow('Launching Test Environment... (Press Ctrl+C to Exit)')
	);
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	page.on('pageerror', err => {
		console.log(chalk.red('Page Error:', err));
		if (totalPoints !== 0) {
			console.log(chalk.red('(-4 Points)'));
			totalPoints -= 4;
		}
	});
	await page.goto(`localhost:1337/index.html`);
	console.log(chalk.green('Page Loaded!'));
	await page.addScriptTag({
		path: JS_FILE
	});
	await insertData(page);
	totalPoints += await evaluateData(page);
	totalPoints += await testHover(page);
	totalPoints += 1; // Gotta make it a nice number
	console.log(chalk.magenta('Final Grade:'), totalPoints);
	console.log(chalk.yellow('Press any key to exit...'));
	process.stdin.setRawMode(true);
	process.stdin.resume();
	process.stdin.on('data', async () => {
		await browser.close();
		server.stop();
		process.exit(0);
	});
})().catch(err => {
	console.error(chalk.red(`Crashed: Total Points so far: ${totalPoints}`));
	console.error(err);
	server.stop();
	process.exit(1);
});
