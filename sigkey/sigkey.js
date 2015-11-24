#!/usr/local/bin/node

var ABC = { a:0, b:1, c:2, d:3, e:4, f:5, g:6, h:7, i:8, j:9, k:10, l:11, m:12, n:13, o:14, p:15, q:16, r:17, s:18, t:19, u:20, v:21, w:22, x:23, y:24, z:25 };
var keysMap = {};

// var questions = [
//   ['4\nacdf\nbcde\nbe\nf', 1],
//   ['8\nbdfhj\ngacie\nbdf\naec\nbdfhj\ngacie\nbdf\naec', 2],
// ];
//
// questions.forEach(function(q) {
//   console.log('result', run(q[0]));
// });

var fs = require('fs');
var data = fs.readFileSync('sigkey.in', 'utf-8');
var r = run(data);
fs.writeFileSync('sigkey.out', r);

function run(str) {
  var arr = str.split('\n');
  var N = arr[0] * 1;
  var keysA = [];
  var keysOther = [];
  for (var i = 0; i < N; i++) {
    var k = arr[i + 1];
    if (k in keysMap) {
      keysMap[k]++;
    } else {
      keysMap[k] = 1;
      var a = keyToArray(k);
      if (a[0] == 1) {
        keysA.push(a);
      }else {
        keysOther.push(a);
      }
    }
  }

  var foundPairs = 0;
  for (var y = 0; y < keysA.length; y++) {
    for (var j = 0; j < keysOther.length; j++) {
      var first = keysA[y];
      var second = keysOther[j];

      var isTail = false;
      var isValid = true;

      for (var s = 1; s < 26; s++) {
        var q = first[s] + second[s];
        if (q == 1 && isTail) {
          isValid = false;
          s = 26;
        } else if (q === 0) {
          isTail = true;
        } else if (q == 2) {
          isValid = false;
          s = 26;
        }
      }

      if (isValid) {
        // foundPairs += keysMap[first[26]] * keysMap[second[26]];
        foundPairs++;
      }
    }
  }

  return foundPairs;
}

function keyToArray(key) {
  var a = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (var i = 0; i < key.length; i++) {
    a[ ABC[key[i]] ] = 1;
  }

  a.push(key);

  return a;
}

// [1, 0, 1, 1, 0, 1] - acdf
// [0, 1, 1, 1, 1] - bcde
// [0, 1, 0, 0, 1] - be
// [0, 0, 0, 0, 0, 1] - f
