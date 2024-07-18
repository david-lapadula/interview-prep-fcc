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

stack.push("BIO12");
stack.push("HIS80");
stack.push("MAT122");
stack.push("PSY44");

console.log(stack.pop())
console.log(stack.pop())