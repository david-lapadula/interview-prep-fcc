/* 
    - Item priority overrides placement in the queue. Enqueued after items with lower priority, it will still come out first
    - Runtime of enqueue increases to O(n) because need to check every item to see where the new one should be based on priority
    - Use case: task scheduling
*/

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        let [, priority] = item;
        let added = false;

        for (let i = 0; i < this.items.length; i++) {
            let itemPriority = this.items[i][1];

            if (priority < itemPriority) {
                this.items.splice(i, 0, item);
                added = true; 
                break;
            }
        }

        if (!added) {
            this.items.push(item);
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.items.shift()[0];
    }

    front() {
        if (this.isEmpty()) {
            return "No items";
        }
        return this.items[0][0];
    }

    size() {
        return this.items.length;
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

let queue = new PriorityQueue(); 

queue.enqueue(["JavaScript", 2]);
queue.enqueue(["Java", 2]);
queue.enqueue(["PHP", 2]);
queue.enqueue(["Python", 1]);

console.log('---------------')
console.log(queue.dequeue())
console.log(queue.size())
console.log(queue.front())
console.log(queue.isEmpty())