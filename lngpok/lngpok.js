#!/usr/local/bin/node

var fs = require('fs');
var str = fs.readFileSync('lngpok.in', 'utf-8');

// TEST 1
// var str = '0 10 15 50 0 14 9 12 40';
// bestSeq 7

// TEST 2
// var str = '1 1 1 2 1 1 3';
// bestSeq 3

// TEST 3
// var str = '5 6 5 6 5 6 5 6 5 6 5 0 0';
// bestSeq 4

var data = str.split(' ');

var cards = [];
var jokers = 0;

data.forEach(function(item){
  item = item*1;
  if(item == 0){
    jokers++;
  } else {
    cards.push(item);
  }
});

cards = merge_sort(cards);

var bestSeq = 0;

var currSeq = 1;
var currCard = cards[0];
var usedJokers = 0;

for(var i=1; i<cards.length; i++){
  // console.log(i, currCard, cards[i], currSeq, usedJokers)
  if( currCard == cards[i] ){
    //DO NOTHING;
    currCard = cards[i];
  } 
  else if( cards[i] == currCard + 1 ){
    currSeq++;
    currCard = cards[i];
  }
  else if( usedJokers < jokers ){
    currSeq++;
    usedJokers++;
    currCard = currCard+1;
    i = i-1;
  }
  else{
    if( currSeq > bestSeq )
      bestSeq = currSeq;
    currSeq = 1;
    usedJokers = 0;
    currCard = cards[i];
  }
}
if( currSeq > bestSeq )
  bestSeq = currSeq;
if( currSeq == bestSeq && usedJokers < jokers )
  bestSeq += (jokers - usedJokers)


// console.log(data, cards, jokers)
// console.log(bestSeq)
fs.writeFileSync('lngpok.out', bestSeq);

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