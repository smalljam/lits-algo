#!/usr/local/bin/node

// console.time('op')

var fs = require('fs');
var data = fs.readFileSync('hamstr.in', 'utf-8').split('\n');
// var data = fs.readFileSync('08.in.txt', 'utf-8').split("\n");
// var data = fs.readFileSync('t/11.in', 'utf-8').split("\n");

// var data = [0]

// console.log('file read')

RUN(data);

var dir = 't/';
var t = ['01.in', '02.in', '03.in', '04.in', '05.in', '06.in', '07.in', '08.in', '09.in', '10.in', '11.in', '12.in'];

// t.forEach(function(tt){
//   var d = fs.readFileSync(dir+tt, 'utf-8').split("\n");
//   console.log('FILE', tt)
//   RUN(d);
//   console.log('ACTUAL', fs.readFileSync('/Users/anton/Google Drive/ADS-002/problems/hamstr/answers/'+tt.replace('in','out'), 'utf-8'));
//   console.log('')
// })

function RUN(data) {
  var memoisedMap = {};

  var S = data[0] * 1;
  var C = data[1] * 1;
  var HC = [];
  for (var i = 0; i < C; i++) {
    var t = data[i + 2].split(' ');
    HC.push([t[0] * 1, t[1] * 1]);
  }

  // console.log('HC array', HC.length)

  var RESULT;

  // S
  // C
  // H G
  // ...
  // H G

  // TEST 1
  //
  // var S = 7;
  // var C = 3;
  // var HC = [
  // 	[1,2],
  // 	[2,2],
  // 	[3,1]
  // ]
  //
  // RESULT 2

  // TEST 2
  //
  // var S = 19;
  // var C = 4;
  // var HC = [
  // 	[5,0],
  // 	[2,2],
  // 	[1,4],
  // 	[5,1]
  // ]

  // RESULT 3

  // TEST 3
  //
  // var S = 2;
  // var C = 2;
  // var HC = [
  // 	[1,50000],
  // 	[1,60000]
  // ]
  //
  // RESULT 1

  // TODO
  // more smart FOR :)

  if (C > 99999) {
    var start = 0;
    var end = C;

    function middle() {
      return Math.ceil(start + (end - start) / 2);
    }

    var lastI;

    function next() {
      var i = middle();
      if (i == lastI) {
        if (!RESULT) {
          if (proceed(0) <= S) {
            RESULT = 1;
          }
        }
        return;
      }
      lastI = i;
      var t = proceed(i);
      // console.log(start, end, i, lastI, t, S)
      if (t <= S) {
        RESULT = i;
        start = i;
        // console.log('INCREASE')
        next();
      } else {
        end = i;
        // console.log('DECREASE')
        next();
      }
    }

    next();
  } else {
    for (var i = C; i > 0; i--) {
      t = proceed(i - 1);
      if (t <= S) {
        RESULT = i;
        i = 0;
      }
    }
  }

  if (RESULT) {
    //check this corner case, i have no idea why is that
    var max = HC[0][0];
    for (var i = 1; i < HC.length; i++) {
      if (HC[i][0] > max) {
        max = HC[i][0];
      }
    }
    var maxH = HC[0][1];
    for (var i = 1; i < HC.length; i++) {
      if (HC[i][1] > maxH) {
        maxH = HC[i][1];
      }
    }
    if (max == 0 && maxH > 0) {
      RESULT++;
    }
  }

  // console.timeEnd('op')
  // console.log(RESULT || 0);
  fs.writeFileSync('hamstr.out', RESULT || 0);

  function proceed(count) {
    if (count == 0) {
      // console.log('HERE')
      var min = HC[0][0];
      for (var i = 1; i < HC.length; i++) {
        if (HC[i][0] < min) {
          min = HC[i][0];
        }
      }
      // console.log('MIN', min)
      return min;
    }

    // console.time('op1')
    // console.log(count, 'iteration')
    var all = totalsForAllHamsters(count);
    // console.log('totals', all)
    var t = 0;
    for (var j = 0; j < count; j++) {
      t += all[1][j];
    }
    // console.log(t, ' is minimum for ', j, ' of ',S)
    // console.timeEnd('op1')
    return t;
  }

  function total(arr) {
    var t = 0;
    arr.forEach(function(item) {
      t += item;
    });
    return t;
  }

  function totalsForAllHamsters(newC) {
    var r = [];
    for (var i = 0; i < C; i++) {
      r.push(totalForOneHamster(i, newC));
    }
    return [newC, merge_sort(r)];
  }

  function totalForOneHamster(i, C) {
    var a = HC[i][0];
    var b = HC[i][1];
    return memoised(a,b,C);
  }

  function memoised(a, b, c) {
    return memoisedMap[a + '_' + b + '_' + c] || addmemoise(a,b,c);
    function addmemoise(a, b, c) {
      // console.log('')
      // console.log('MEMOISE!!!!!')
      // console.log('')
      memoisedMap[a + '_' + b + '_' + c] = a + b * c;
      return memoisedMap[a + '_' + b + '_' + c];
    }
  }

  //Merge sort
  function isLess(a, b) {
    return a * 1 < b * 1;
  }
  function merge_sort(arr) {

    return mergesort_recursive(arr, 0, arr.length - 1);

    function mergesort_recursive(array, start, end) {
      if (start >= end) {
        return [array[start]];
      }
      var middle = Math.floor((start + end) / 2);
      var left_part = mergesort_recursive(array, start, middle);
      var right_part = mergesort_recursive(array, middle + 1, end);
      return merge(left_part, right_part);
    }

    function merge(A, B) {
      var aPointer = 0;
      var bPointer = 0;
      var writePointer = 0;
      var R = [];

      while (aPointer < A.length && bPointer < B.length) {
        if (isLess(A[aPointer], B[bPointer])) {
          R[writePointer++] = A[aPointer++];
        } else {
          R[writePointer++] = B[bPointer++];
        }
      }

      while (aPointer < A.length) {
        R[writePointer++] = A[aPointer++];
      }

      while (bPointer < B.length) {
        R[writePointer++] = B[bPointer++];
      }

      return R;
    }
  }
}
