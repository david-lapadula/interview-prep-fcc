/*
    - O(n log n) worst case
        - n depth (d) = log2 n with binary divisions, and then need to do n operations at each level to merge the arrays
    - O(n) space complexity because temp arrays used for merging
    - Easily parallelized, divide step can be put into different threads
    - Stable because will preserve order of equivalent elements
    - Not in place because does not use a fixed amount of additional space. New space needed is dependent on input
    - Recursive overhead means small lists might be more efficiently sorted by insertion sort
    - Left branch is pushed onto the stack first for every iteration so the tree will be handled by left branch first always
    - Results of merge are concatenated because one side could have large numbers left over. slice() will remove everything before an index
*/

function mergeSort(array) {
    if (array.length === 1) {
        return array;
    }

    let halfWayPoint = Math.floor(array.length / 2);
    let firstHalf = array.slice(0, halfWayPoint);
    let secondHalf = array.slice(halfWayPoint, array.length);

    return  merge(mergeSort(firstHalf), mergeSort(secondHalf))
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++; 
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}


let result = merge([6, 8, 8, 8, 8], [1, 2, 3, 4, 5]);

console.log(result);