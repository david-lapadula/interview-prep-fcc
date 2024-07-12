/*
    - Builds sorted array one item at a time, taking next element and put where it belongs in sorted portion
    - While loop condition to check if greater than current value will terminate before j = 0. This allows insertion into correct spot
        - j + 1 represents the last index for which the currentValue was smaller than the target value
    - O(n^2) worst case complexity
    - Pro: O(n) best case because while loop will run few times if it is already sorted
    - Con: Will do many swaps because inserting requires shifting all the elements after the inserted
 */

function insertionSort(array) {

    for (let i = 1; i < array.length; i++) {
        let currentValue = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > currentValue) {
            array[j + 1] = array[j]
            j--;
        }
    
        array[j + 1] = currentValue;
    }

    return array;
}


let result = insertionSort([1,4,2,8,345,123,43,32]);

console.log(result);