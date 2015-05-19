var fs = require('fs');
var file = process.argv[2] || input.txt
var raw = fs.readFileSync(file,'utf8');
var data = raw.split('\n')
var N = data[0]*1;
var ratings = data[1].split(' ');
var lowIgnoreCount = data[2]*1;
var highIgnoreCount = data[3]*1;

console.log(lowIgnoreCount, highIgnoreCount)

if(lowIgnoreCount + highIgnoreCount < N) {

  var sorted_rating = merge_sort(ratings);
  var start = lowIgnoreCount ? lowIgnoreCount - 1 : 0;
  var stop = ratings.length - highIgnoreCount;
  var sum = 0;
  for(var i = start; i < stop; i++){
    sum += sorted_rating[i]*1;
  }
  console.log( Math.ceil(sum/(stop - start)) )

} else {
  console.error('lowIgnoreCount (%s) + highIgnoreCount (%s) >= N (%s)', lowIgnoreCount, highIgnoreCount, N);
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

  function isLess(a,b){
    // compareRunned++;
    return a < b;
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
      // swapRunned++;
    }
    
    while( aPointer < A.length ) {
      R[writePointer++] = A[aPointer++];
      // swapRunned++;
    }

    while( bPointer < B.length ) {
      R[writePointer++] = B[bPointer++];
      // swapRunned++;
    }

    return R;
  }

  // console.log(merge([3,4,5],[0,1,2]))
  // console.log(merge([8,9,15],[0,13,21]))
  // console.log(merge([3,4,5,7,8,9,11],[0,1,4,6,8,9,10]))

}
