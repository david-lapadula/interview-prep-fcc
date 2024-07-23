/*
    - Create associative array, mapping of K/V pairs
    - Take key and hash in deterministic way to numerical value
    - Numerical value is used as key to store the value. Using the same key gives you the same value
    - O(1) or constant lookup time
    - If two values give same hash - collision - could store both pairs at that index
        - Iterate through bucket to find key looking for
        - Good hashing function minimizes collisions
    - Deleting object key can be expensive
        - Engine optimizes based on set of keys (shape). Deleting key changes shape
        - Could lead to rebuilding hashtable
        - Could lead to garbage collection if property holds a reference
        - Better to set to null
*/

let called = 0; 

let hash = string => {
    called++;
    let hashed = 0;

    for (let i = 0; i < string.length; i++) {
        hashed += string.charAt(i)
    }

    return hashed;
}

class HashTable {
    constructor() {
        this.collection = {};
    }

    add(key, value) {
        const hashedKey = hash(key);
        this.collection[hashedKey] = this.collection[hashedKey] || {};
        this.collection[hashedKey][key] = value;
    }

    remove(key) {
        const hashedKey = hash(key);
        delete this.collection[hashedKey][key];

        if (Object.keys(this.collection[hashedKey]).length == 0) {
            delete this.collection[hashedKey];
        }
    }

    lookup(key) {
        const hashedKey = hash(key);
        return this.collection[hashedKey][key];
    }
}

let hashTable = new HashTable();

hashTable.add('key', 'value');

console.log(hashTable.lookup('key'))