/*
    - Choose pivot, build subarrays of greater and less values, recursively call quickSort on both and return the ordered array
        - First or last element pivot has poor performance
            - Already or nearly sorted will cause high recursion depth; most values will be either smaller or larger
        - Random element reduces probability of selecting the largest/smallest value for pivot and by extension unbalanced partitions
        - Median: If list is sorted, it will pick the middle value and reduce chances of unbalanced partitions
    - Worst case scenario occurs with unbalanced partitions; more recursive calls and comparisons to build the arrays
        - Could be n^2 runtime because n comparisons and n levels if sorted with bad partition choice
    - O (n log n) runtime
        - Partition process takes O(n)
        - log n levels to a balanced tree. If n is the initial size, d number of binary divisions will get you to the point where each operand is 1 and the recursion terminates
            - Depth of recursion tree will grow logarithmically w.r.t. n depth (d) = log2 n
 */

function quickSort(arr) {
    let length = arr.length; 

    if (length <= 1) {
        return arr;
    }

    const mid = Math.floor(length / 2);
    const pivot = median(arr[0], arr[mid], arr[length- 1]);
    const left = [];
    const right = [];
    const equal = [];

    for (const num of arr) {
        if (num < pivot) {
            left.push(num);
        } else if (num > pivot) {
            right.push(num);
        } else {
            equal.push(num);
        }
    }

    return [...quickSort(left), ...equal, ...quickSort(right)];
}

// find median of three numbers
function median(a, b, c) {
    if ((a > b) !== (a > c)) return a;
    if ((b > a) !== (b > c)) return b;
    return c;
}


let result = quickSort([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92])

console.log(result);