/*
    - Use dictionary for items for constant lookup time
    - Update length when adding or removing so dont need expensive call to iterate object
    - For a union, which is all values from both sets without duplicates, leverage set's ability to not add duplicates
    - Intersection: common to two or more sets
        - Only care if new has matches any values in existing set. Already know values of current set
        - Use 'this' to refer to current object and iterate smaller set to optimize how many items are compared. 
    - Difference is items present in first set but absent in second
    - Subset checks if first is fully contained in the second, if so it is a subset
*/

class Set {
    constructor(values) {
        this.dictionary = {};

        for (const value of values) {
            if (!this.has(value)) {
                this.dictionary[value] = value;
            }
        }

        this.length = this.values().length;
    }

    has(value) {
        return this.dictionary[value] !== undefined;
    }

    values() {
        return Object.values(this.dictionary);
    }

    add(value) {
        if (!this.has(value)) {
            this.dictionary[value] = value;
            this.length++;
            return true;
        }

        return false;
    }

    remove(value) {
        if (this.has(value)) {
            delete this.dictionary[value];
            this.length--;
            return true;
        }

        return false;
    }

    union(anotherSet) {
        const set = new Set([]);
        const addToSet = el => set.add(el);

        this.values().forEach(addToSet);
        anotherSet.values().forEach(addToSet);

        return set;
    }

    intersection(anotherSet) {
        const intersect = new Set([]);
        let largeSet;
        let smallSet;

        if (this.size() > anotherSet.size()) {
            largeSet = this;
            smallSet = anotherSet;
        } else {
            largeSet = anotherSet;
            smallSet = this;
        }

        for (const value of smallSet.values()) {
            if (largeSet.has(value)) {
                intersect.add(value);
            }
        }

        return intersect;
    }

    difference(anotherSet) {
        const differ = new Set([]);

        for (const value of this.values()) {
            if (!anotherSet.has(value)) {
                differ.add(value);
            }
        }

        return differ;
    }

    isSubsetOf(anotherSet) {
        let isSubset = true;;

        for (const value of this.values()) {
            if (!anotherSet.has(value)){
                isSubset = false; 
                break
            }
        }

        return isSubset;
    }

    size() {
        return this.length;
    }

}


const set1 = new Set(['a', 'b', 'c']);
const set2 = new Set(['a',  'b', 'd', 'e']);


console.log(set1.has(1));

console.log(set1.has(6));

console.log(set1.size())

console.log(set1.union(set2))

console.log(set1.intersection(set2));

console.log(set1.difference(set2))
