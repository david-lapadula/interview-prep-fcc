/*
  - For array of elements and number, find pairs of indices that sum to number. Sum all values of indices, even if there are multiple pairs
  - Elements (indices in the array) cannot be reused, but same numbers at different indices can
  - Nested for loops will yield O(n^2) worst case run time
  - Reduce run time to O(n) if we use an indexMap
    - Complement is looking for number you would need to add to current value to get target
    - Store the mapping of currentValue to its index because it could be a future complement
    - If indexMap has the complement, then that complement plus the current value gets you the target
    - If indexMap has complement key delete it so corresponding index is not reused and currentValue never gets stored in indexMap so it cant be used either
*/


function pairwise(arr, arg) {
  const indexMap = {};
  let sumIndices = 0;

  for (let i = 0; i < arr.length; i++) {
    const currentValue = arr[i];
    const complement = arg - currentValue;

    if (indexMap.hasOwnProperty(complement)) {
      sumIndices += i + indexMap[complement];
      delete indexMap[complement];
    } else {
      indexMap[currentValue] = i;
    }
  }

  return sumIndices;
}


function pairwise_Nested(arr, arg) {
    const used = new Array(arr.length).fill(false);
    let sumIndices = 0;
  
    for (let i = 0; i < arr.length; i++) {
      if (used[i]) continue;
  
      for (let j = i + 1; j < arr.length; j++) {
        if (used[j]) continue; 
  
        if (arr[i] + arr[j] === arg) {
          sumIndices += i + j;
          used[i] = true;
          used[j] = true;
          break;
        }
      }
    }
  
    return sumIndices;
  }
  
 let result = pairwise([1, 4, 2, 3, 0, 5], 7)

 console.log(result)