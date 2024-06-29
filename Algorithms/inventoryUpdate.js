
/*
    - Runtime will be O(n + m + klogk) where k is unique items from n and m. 
    - JavaScript sort will typically run in nlogn time.
    - When destructuring, leaving one index blank will target the other, like [, value] or [key]
    - Need to update the inventoryIndexMap in case there are duplicates in arr2. Set it at the end of the array
*/ 

function updateInventory(arr1, arr2) {
    let inventoryIndexMap = new Map();

   
    arr1.forEach((element, index) => {
        const [, name] = element;
        inventoryIndexMap.set(name, index);
    });


    arr2.forEach(element => {
        const [quantity, name] = element;
        if (inventoryIndexMap.has(name)) {
            let index = inventoryIndexMap.get(name);
            arr1[index][0] += quantity;
        } else {
            arr1.push(element);
            inventoryIndexMap.set(name, arr1.length - 1);
        }
    });

    return arr1.sort(([, name1], [, name2]) => name1.localeCompare(name2)); 
}

var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

console.log(updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]));