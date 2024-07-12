/*
    - Select smallest value, place at beginning of array, then lock in smallest index and move to next
    - Assume first index is minimum and then compare to rest of values in the array
    - n - 1 iterations outer loop
        - Setting j as (n + 1) will check the last element on the final iteration
        - n - 1 and j + 1 for inner loop cancel each other out
    - O(n^2) time complexity because nested for loops
    - Pro: If write cost is expensive will perform less swaps
    - Con: Will always run nested for loops even if array is near sorted. It just wont do the swap
*/


function selectionSort(array) {
    let n = array.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (array[minIndex] > array[j]) {
                minIndex = j;
            }
        }

        if (i !== minIndex) {
            let currentMin = array[i];
            array[i] = array[minIndex];
            array[minIndex] = currentMin; 
        }
    }

    return array;
}

  let result = selectionSort([4,3,2,1]);

  console.log(result);