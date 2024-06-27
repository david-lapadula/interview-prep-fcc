
/*
* Runtime will be O(n + m + klogk) where k is unique items from n and m. 
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
            inventoryIndexMap.set(name, arr1.length - 1); // update the map to handle duplicates in arr2
        }
    });

    return arr1.sort(([, name1], [, name2]) => name1.localeCompare(name2)); // js sort will typically run in nlogn time.
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