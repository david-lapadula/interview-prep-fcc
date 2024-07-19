/* 
    - FIFO principle, first added is the next one out
    - Use case: task scheduling, message queue
*/

class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.items.shift();
    }

    front() {
        if (this.isEmpty()) {
            return "No items";
        }
        return this.items[0];
    }

    size() {
        return this.items.length;
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

let queue = new Queue(); 

queue.enqueue("JavaScript");
queue.enqueue("Java");
queue.enqueue("PHP");
queue.enqueue("Python");

console.log(queue.dequeue())
console.log(queue.size())
console.log(queue.front())
console.log(queue.isEmpty())