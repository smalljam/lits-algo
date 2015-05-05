// Array of N, size can not be changed 
// read a[i], O(1)
// write a[i], O(1)
// size of A, O(1)
// var A = [3,5,6,1,2,4,5]
// console.log(A)

// comparison function: a[i] > a[j]
var compareRunned = 0;
function isLess(a,b){
  compareRunned++;
  return a < b;
}
var swapRunned = 0;
function swapElements(arr, index1, index2){
  if(index1==index2) return;
  swapRunned++;

  var temp = arr[index2];
  arr[index2] = arr[index1];
  arr[index1] = temp;
}

// Selection sort
function selection_sort(arr){
  var A = [].concat(arr);
  var size = A.length;
  for(var i = 0; i<size; i++){
    var min_index = i;
    for(var j=i; j<size; j++){
      if( isLess(A[j], A[min_index]) ) {
        min_index = j;
      }
    }
    swapElements(A, i, min_index);
  }
  return A; 
}

// Insertion sort
// depends on data distribution in array
function insertion_sort(arr){
  var A = [].concat(arr);
  var size = A.length;

  for(var i=0; i<size; i++){
    var j = i
    while(j>0 && isLess(A[j], A[j-1])){
      swapElements(A, j-1, j);
      j--;
    }
  }
  return A;
}


//Bubble sort
function bubble_sort(arr){
  var A = [].concat(arr);
  var size = A.length;

  for(var i=0; i<size; i++){
    var swapped = false;
    for(var j=1; j<size-i; j++){
      if( isLess(A[j], A[j-1]) ) {
        swapElements(A, j, j-1)
        swapped = true;
      }
    }
    if( swapped == false ){
      i = size;
    }
  }
  return A;

}


function run(N, func, show_arrays){
  compareRunned = 0;
  swapRunned = 0;

  var A = generateArray(N);
  console.log('RUN');
  console.log('%s with %s', N , func.name);
  var sorted = func(A);

  if(show_arrays){
    console.log( A );
    console.log( sorted );
  }

  console.log('compare:', compareRunned );
  console.log('swap:', swapRunned );
  console.log('');
}

function generateArray(N){
  var arr = [];
  for (var i = 0, l = N; i < l; i++) {
    arr.push(Math.round(Math.random() * l))
    // arr.push(i)
  }
  return arr;
}



// RUN
run(13, selection_sort, true)
run(13, insertion_sort, true)
run(13, bubble_sort, true)


// run(100, insertion_sort)
// run(100, selection_sort)
