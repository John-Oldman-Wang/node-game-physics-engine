const index = require('./index');

const p = index({
  gravity: { y: 0 },
  x: 0,
  y: 397,
  width: 750,
  height: 540,
  debug: false
});

const ball = p.add.image(376, 667, 'game', 'ball.png', 32, 31);

p.world.setBoundsCollision(true, true, true, true);

ball.setVelocity(100, 100);
ball.setVelocity(100, 100);
ball.setOrigin(0.5, 1);
ball.setBounce(1, 1);
ball.setCollideWorldBounds(true);

for (let i = 0; i < 1000; i++) {
  p.world.step(16 / 1000);
}

console.log(ball.x, ball.y);
console.log(ball.body.top, ball.body.height, ball.body.bottom);

// function concat(...args) {
//   var arr = [];
//   args.forEach((item) => {
//     if (Array.isArray(item)) {
//       return arr.push(...concat(...item));
//     }
//     arr.push(item);
//   });
//   return arr;
// }
// const path = require('path');
// const fs = require('fs');

// function readdir(dirPath) {
//   const files = fs.readdirSync(dirPath);
//   const fileArr = files.map((file) => {
//     let filePath = path.resolve(dirPath, file);
//     if (fs.statSync(filePath).isDirectory()) {
//       return readdir(filePath);
//     }
//     return filePath;
//   });
//   return concat(fileArr);
// }

// const files = readdir(path.resolve(__dirname, './src'));
// console.log(files.length);
// console.log(Object.keys(require.cache));
// console.log(files.filter((i) => !Object.keys(require.cache).includes(i)));

// files.forEach((filePath) => {
//   fs.readFile(filePath, (err, buf) => {
//     if (err) console.log(err);
//     let str = buf.toString();
//     if (/\/\*\*(.|\r|\n)*?\*\//g.test(str)) {
//       const newStr = str.replace(/\/\*\*(.|\r|\n)*?\*\//g, '');

//       fs.writeFile(filePath, newStr, (err) => {
//         if (err) console.log(err);
//       });
//     }
//   });
// });
