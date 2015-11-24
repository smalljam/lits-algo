#!/usr/local/bin/node

// var questions = [
//   [10, 2, 3, 9],
//   [2, 1000000000, 999999999, 1999999998],
//   [4, 1, 1, 2],
// ];
//
// questions.forEach(function(q) {
//   console.log(run(q));
// });
var fs = require('fs');
var data = fs.readFileSync('bugtrk.in', 'utf-8');
var q = data.split('\n')[0].split(' ');

var r = run(q);

// console.log(r);
fs.writeFileSync('bugtrk.out', r);

function run(q) {
  var N = q[0] * 1;
  var W = q[1] * 1;
  var H = q[2] * 1;

  if (W > H) {
    H = q[1] * 1;
    W = q[2] * 1;
  }

  var S = N * W * H;
  var root = Math.sqrt(S);

  var cols = Math.ceil(root / W);
  var newS = Math.pow(cols * W, 2);

  var newRoot = Math.sqrt(newS);

  //check if we can fit all
  var rows = Math.floor(newRoot / H);

  var newN = cols * rows;

  //we can't fit all, so adding 1 row
  if (newN < N) {
    rows++;
    newRoot = rows * H;
  }

  return newRoot;
}
