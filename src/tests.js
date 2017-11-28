const chalk = require('chalk');

const dummyData = [
	['oldruff23', 'what a heckin good boye', 'woofer'],
	['tailwagger27', 'pupper can help too', 'pupper'],
	['skyboye16', 'theses are some fluffy woofers', 'clouds'],
	['slytherin2ya', 'sneks are just long doggos', 'snek']
];

const insertData = async page => {
	for (data of dummyData) {
		await page.type('#input-username', data[0]);
		await page.type('#input-caption', data[1]);
		await page.select('select#input-picture', data[2]);
		const submit = await page.$('button');
		await submit.click();
		await page.evaluate(() =>
			// Probably should've given the form an id
			document.getElementsByTagName('form')[0].reset()
		);
	}
};

const evaluateData = async page => {
	let points = 0;
	const children = await page.evaluate(() => {
		const nodeList = document.getElementById('post-list');
		return [].slice.call(nodeList.children).map(node => {
			return {
				user: node.children[0].innerText,
				img: node.children[1].src,
				caption: node.children[2].innerText,
				className: node.className
			};
		});
	});
	if (children.length === 4) {
		console.log(chalk.green('Child Nodes Added Successfully (+20 Points)'));
		points += 20;
	}
	for (i in children) {
		if ((children[i].className = 'post')) {
			console.log(
				chalk.green(`Child ${i} Correct ClassName (+4 Points)`)
			);
			points += 4;
		} else {
			console.log(
				chalk.red(`Child ${i} Incorrect ClassName (-4 Points)`)
			);
		}
		if ((children[i].user = dummyData[i][0])) {
			console.log(chalk.green(`Child ${i} Correct Username (+3 Points)`));
			points += 3;
		} else {
			console.log(chalk.red(`Child ${i} Incorrect UserName (-3 Points)`));
		}
		if ((children[i].caption = dummyData[i][1])) {
			console.log(chalk.green(`Child ${i} Correct Caption (+3 Points)`));
			points += 3;
		} else {
			console.log(chalk.red(`Child ${i} Incorrect Caption (-3 Points)`));
		}
	}
	return points;
};

const testHover = async page => {
	let points = 0;
	await page.hover('.post');
	const hoverStats = await page.evaluate(() => {
		const style = document.getElementById('post-overlay').style;
		return {
			opacity: style.opacity,
			transitionDuration: style.transitionDuration,
			transitionProperty: style.transitionProperty
		};
	});
	if (hoverStats.opacity === '1') {
		console.log(chalk.green(`Correct Hover Opacity (+5 Points)`));
		points += 5;
	} else {
		console.log(chalk.red(`Incorrect Hover Opacity (-5 Points)`));
	}
	if (hoverStats.transitionDuration === '0.5s') {
		console.log(chalk.green(`Correct Hover Transition (+5 Points)`));
		points += 5;
	} else {
		console.log(chalk.red(`Incorrect Hover Transition (-5 Points)`));
	}
	if (hoverStats.transitionProperty === 'opacity') {
		console.log(chalk.green(`Correct Transition Property (+5 Points)`));
		points += 5;
	} else {
		console.log(chalk.red(`Incorrect Transition Property (-5 Points)`));
	}
	return points;
};

module.exports = {
	insertData,
	evaluateData,
	testHover
};
