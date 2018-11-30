const chalk = require('chalk');
const log = color => string => console.log(chalk[color](string));

const dummyData = [
   ['oldruff23', 'what a heckin good boye', 'woofer'],
   ['tailwagger27', 'pupper can help too', 'pupper'],
   ['skyboye16', 'theses are some fluffy woofers', 'clouds'],
   ['slytherin2ya', 'sneks are just long doggos', 'snek']
];

const insertData = async page => {
   page.evaluate(() =>
      document
         .getElementById('postForm')
         .addEventListener('submit', handleFormSubmit)
   );
   for (data of dummyData) {
      await page.type('#formUsername', data[0]);
      await page.type('#formCaption', data[1]);
      await page.select('select#formImg', data[2]);
      const submit = await page.$('button');
      await submit.click();
      await page.evaluate(() => document.getElementById('postForm').reset());
   }
};

const evaluateData = async page => {
   let points = 0;
   const children = await page.evaluate(() => {
      const nodeList = document.getElementById('postList');
      return [...nodeList.children].map(node => {
         return {
            user: node.children[0].innerText,
            img: node.children[1].src,
            caption: node.children[2].innerText,
            className: node.className
         };
      });
   });
   if (children.length === 4) {
      log('green')('Child Nodes Added Successfully (+15 Points)');
      points += 15;
   }
   for (i in children) {
      if ((children[i].className = 'post')) {
         log('green')(`Child ${i} Correct ClassName (+3 Points)`);
         points += 3;
      } else {
         log('red')(`Child ${i} Incorrect ClassName (-3 Points)`);
      }
      if ((children[i].user = dummyData[i][0])) {
         log('green')(`Child ${i} Correct Username (+3 Points)`);
         points += 3;
      } else {
         log('red')(`Child ${i} Incorrect UserName (-3 Points)`);
      }
      if ((children[i].caption = dummyData[i][1])) {
         log('green')(`Child ${i} Correct Caption (+3 Points)`);
         points += 3;
      } else {
         log('red')(`Child ${i} Incorrect Caption (-3 Points)`);
      }
      if (children[i].img.indexOf(dummyData[i][2]) !== -1) {
         log('green')(`Child ${i} Correct Image (+3 Points)`);
         points += 3;
      } else {
         log('red')(`Child ${i} Incorrect Image (-3 Points)`);
      }
   }
   return points;
};

const testHover = async page => {
   let points = 0;
   await page.hover('.post');
   const hoverStats = await page.evaluate(() => {
      const { style } = document.getElementsByClassName('postOverlay')[0];
      return {
         opacity: style.opacity
      };
   });
   if (hoverStats.opacity === '1') {
      log('green')(`Correct Hover Opacity (+10 Points)`);
      points += 10;
   } else {
      log('red')(`Incorrect Hover Opacity (-10 Points)`);
   }
   return points;
};

module.exports = {
   insertData,
   evaluateData,
   testHover
};
