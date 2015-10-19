#!/usr/local/bin/node

var fs = require('fs');
var data = fs.readFileSync('discnt.in', 'utf-8').split("\n");
// var prices = strToNumbers(data[0].trim().split(' '));
var prices = data[0].trim().split(' ');
var sortedPrices = merge_sort(prices);
var discount = (100-data[1].trim())/100;

if( sortedPrices.length < 50 )
	console.log('PRICES',sortedPrices);

console.log('PRICES LENGTH',sortedPrices.length);
console.log('DISCOUNT',discount);

var skipFromStart = sortedPrices.length % 3;
var totalGroups = (sortedPrices.length - skipFromStart)/3;

var lastItem = totalGroups*2 + skipFromStart;

console.log('ITEMS TO SKIP',skipFromStart);
console.log('TOTAL GROUPS', totalGroups);
console.log('LAST ITEM', lastItem);

var total = 0;
for(var i = 0; i < skipFromStart; i++){
	total += sortedPrices[i]*1;
}

for( var i = skipFromStart; i <lastItem; i+=2 ) {
	var first = sortedPrices[i]*1;
	var second = sortedPrices[i+1]*1;
	var third = sortedPrices.pop();
	console.log('ITERATION '+i+':', first, second, third, third*discount);
	total = total + first + second + third*discount;
}

var finalTotal = (Math.round(total*100)/100).toFixed(2);
console.log('GRAND TOTAL', finalTotal)

fs.writeFileSync('discnt.out', finalTotal);

// function strToNumbers(strArray){
// 	var r = [];
// 	var cnt = strArray.length;
// 	var i;
// 	for(i=0; i<cnt;i++){
// 		r.push(strArray[i]*1);
// 	}
// 	return r;
// }

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