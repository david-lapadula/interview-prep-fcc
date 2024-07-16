/*
    - Greatest or largest value, depending on order, will bubble up to the end through swapping, and then is locked in
    - After a swap, i + 1 becomes new i
    - Nested for loop
        - Outer loop allows multiple passes through array and ignoring last element by using i to control length of inner loop
        - If you iterate array and make no swaps, its sorted so outer loop can terminate
        - Each inner loop still starts at first index, just the array is one step closer to being sorted and ignores the last element
    - While
        - Less readable and intuitive because manually resetting indices
        - Terminates when length is 1 because the i would become 0 and is the smaller value
    - O(n^2) time complexity because nested for loops
*/

function bubbleSort_For(arr) {
    let n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;

        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }

        if (!swapped) {
            break;
        }
    }

    return arr;
}

function bubbleSort_While(array) {
    let length = array.length;
    let i = 0;
    let j = 1;

    while (i < length - 1) {
        if (array[i] > array[j]) {
            let current = array[i];
            array[i] = array[j];
            array[j] = current;

        }

        if (j === length - 1) {
            i = 0;
            j = 1;
            length--;
        } else {
            i++;
            j++;
        }
    }

    return array;
}

let result = bubbleSort_For([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92]);

console.log(result);