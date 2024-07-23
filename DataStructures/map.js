/*
    - Use K/V pairs, allow for rapid lookup
    - Use entries for size because could be null values
    - Use spread to make new array for values to prevent mutations
    - ES6 map will track insertion order of items added
*/

class Map {
    constructor() {
        this.collection = {};
    }

    add(key, value) {
        this.collection[key] = value;
    }

    remove(key) {
        if (this.has(key)) {
            delete this.collection[key];
        }
    }

    get(key) {
        if (this.has(key)) {
            return this.collection[key];
        }
        return undefined;
    }

    has(key) {
        return this.collection.hasOwnProperty(key);
    }

    values() {
        return [...Object.values(this.collection)];
    }

    size() {
        return Object.entries(this.collection).length;
    }

    clear() {
        this.collection = {};
    }

}