/* 
    - LIFO service. Most recently used is last to come out
    - In JS can add things to end of array, and then retrieve last item
    - Peek can view latest item without removing it
    - Use case: LRU cache, call stack
*/


class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.items.pop();
    }

   
     peek() {
        if (this.isEmpty()) {
            return "No elements in Stack";
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }
}

let stack = new Stack();

queue.push("BIO12");
queue.push("HIS80");
queue.push("MAT122");
queue.push("PSY44");

console.log(queue.pop())
console.log(queue.pop())