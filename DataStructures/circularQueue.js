/*
    - Max is another way to represent full queue
    - Modulo will use remainder from max to get current item to read or write
        - Equivalent to saying remainder after removing full queues have been written
    - this.write >= this.read + maxLength means there have been the equivalent to a full queue of writes since the last read
        - Write cannot go a full queue size ahead of read, otherwise would overwrite data that hasnt been read yet
    - this.read >= this.write to ensure you dont read data that hasnt been written yet 
*/

class CircularQueue {
    constructor(size) {
        this.queue = [];
        this.read = 0;
        this.write = 0;
        this.max = size - 1;

        while (size > 0) {
            this.queue.push(null);
            size--;
        }
    }

    print() {
        return this.queue;
    }

    enqueue(item) {
        let maxLength = this.max + 1;

        if (this.write >= this.read + maxLength) {
            return null;
        }

        this.queue[this.write % maxLength] = item;

        this.write++;
        return item;
    }

    dequeue() {
        if (this.read >= this.write) {
            return null;
        }

        let maxLength = this.max + 1;

        const item = this.queue[this.read % maxLength];
        this.queue[this.read % maxLength] = null;

        this.read++;
        return item;
    }
}

let circularQueue = new CircularQueue(5)

circularQueue.enqueue(1);
circularQueue.enqueue(2);
circularQueue.enqueue(3);
circularQueue.enqueue(4);
circularQueue.enqueue(5);

circularQueue.dequeue();
circularQueue.dequeue();

circularQueue.enqueue(6);
circularQueue.enqueue(7);


console.log(circularQueue.print());