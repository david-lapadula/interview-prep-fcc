/*
    - Time complexity
        - O(log n). d = log2 n. Binary divisions of a list and base case is 1
    - Space complexity
        - Iterative: O(1) doesnt store additional values
        - Recursive: O(n) space is proportional to recursion stack. Need to add memory to stack to handle. 
    - Pointers
        - Left being <= right means there is a valid range to search. 
        - Start with 0 and length - 1 as initial search space is whole list.
        - Adding L + R will always give middle of those two numbers, when floored give halfway point of array 
*/

function binarySearchIterative(searchList, value) {
    let left = 0;
    let right = searchList.length - 1;
    let path = [];

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = searchList[mid];

        path.push(midValue);

        if (midValue === value) {
            return path;
        } else if (midValue < value) {
            left = mid + 1
        } else {
            right = mid - 1;
        }
    }

    return "Value Not Found";
}

function binarySearchRecurisve(searchList, value, left, right, path) {
    if (left > right) {
        return "Value Not Found";
    }

    const mid = Math.floor((left + right) / 2);
    const midValue = searchList[mid];

    path.push(midValue);

    if (midValue === value) {
        return path;
    } else if (midValue < value) {
        return binarySearchRecurisve(searchList, value, mid + 1, right, path);
    } else {
        return binarySearchRecurisve(searchList, value, left, mid - 1, path);
    }
}

function binarySearchRecurisveWrapper(searchList, value){
    return binarySearchRecurisve(searchList, value, 0, searchList.length - 1, []);
}

const testArray = [
    0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 49, 70
];


let result = binarySearchRecurisveWrapper(testArray, 0);

console.log(result);