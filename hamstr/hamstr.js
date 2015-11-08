#!/usr/local/bin/node

var fs = require('fs');
var data = fs.readFileSync('hamstr.in', 'utf-8').split("\n");

var S = data[0]*1;
var C = data[1]*1;
var HC = [];
for(var i = 0; i<C; i++){
	var t = data[i+2].split(' ');
	HC.push([t[0]*1, t[1]*1]);
}

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
//
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
for( var i = C; i>0; i--){
	var all = totalsForAllHamsters(i-1);
	var minimum = all[1].slice(0,i);
	var t = total( minimum );
	if( t <= S ){
		RESULT = i;
		i = 0;
	}
}

fs.writeFileSync('discnt.out', RESULT);








function total(arr){
	var t = 0;
	arr.forEach(function(item){
		t += item;
	});
	return t;
}

function totalsForAllHamsters(newC){
	var r = [];
	for(var i=0; i<C; i++){
		r.push(totalForOneHamster(i, newC));
	}
	return [newC, merge_sort(r)];
}

function totalForOneHamster(i, C){
	return HC[i][0] + C*HC[i][1];
}

//Merge sort
function isLess(a,b){
	return a*1 < b*1;
}
function merge_sort(arr){

  return mergesort_recursive(arr, 0, arr.length-1);

  function mergesort_recursive(array, start, end) {
    if( start >= end ) {
      return [array[start]]
    }
    var middle = Math.floor((start + end) / 2)
    var left_part = mergesort_recursive(array, start, middle);
    var right_part = mergesort_recursive(array, middle + 1, end);
    return merge(left_part, right_part);
  }


  function merge(A,B){
    var aPointer = 0;
    var bPointer = 0;
    var writePointer = 0;
    var R = [];

    while( aPointer < A.length && bPointer < B.length ) {
      if( isLess(A[aPointer], B[bPointer]) ){
        R[writePointer++] = A[aPointer++];
      } else {
        R[writePointer++] = B[bPointer++];
      }
    }

    while( aPointer < A.length ) {
      R[writePointer++] = A[aPointer++];
    }

    while( bPointer < B.length ) {
      R[writePointer++] = B[bPointer++];
    }

    return R;
  }
}

