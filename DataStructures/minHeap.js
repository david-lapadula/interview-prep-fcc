/*
    - Heap for priority queue because store max/min in first position
    - Operations the same as max heap except check is reversed to ensure smallest item goes to top
    - Heap sort
        - Take unsorted array, add each to min heap, then extract each value into new array
        - Min heap structure ensures will be sorted
        - Worst case of O(nlog(n))
    - Heapify is a logn expression, which happens n times when removing smallest to sort
        - Height of binary tree is logn, so in worst case need to traverse entire height
*/

let MinHeap = function () {
    this.heap = [null];

    this.print = () => console.log([...this.heap]);

    this.insert = (item) => {
        this.heap.push(item);

        let index = this.heap.length - 1;
        let parentIndex = Math.floor(index / 2);

        while (index > 1 && item < this.heap[parentIndex]) {
            this.heap[index] = this.heap[parentIndex];
            this.heap[parentIndex] = item;

            index = parentIndex;
            parentIndex = Math.floor(index / 2);
        }
    }


    this.remove = () => {
        this.heap = [...this.heap];
        let min = this.heap[1];
        let last = this.heap.pop();
        if (this.heap.length > 1) {
            this.heap[1] = last;
            this.heapify(1);
        }
        return min;
    }


    this.sort = () => {
        let heap = [...this.heap];
        let sorted = [];

        while (this.heap.length > 1) {
            sorted.push(this.remove());
        }

        this.heap = heap;
        return sorted;
    }

    this.heapify = (i) => {
        let large = i;
        let l = 2 * i;
        let r = 2 * i + 1;
        let length = this.heap.length;

        if (l < length && this.heap[l] < this.heap[large]) {
            large = l;
        }

        if (r < length && this.heap[r] < this.heap[large]) {
            large = r;
        }

        if (large != i) {
            this.swap(i, large);
            this.heapify(large);
        }
    }

    this.swap = (index1, index2) => {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }
}

function createRandomArray(size = 5) {
    let a = new Array(size);
    for (let i = 0; i < size; i++)
        a[i] = Math.floor(Math.random() * 100);

    return a;
}
const array = createRandomArray(25);

let minHeap = new MinHeap();

array.map(item => minHeap.insert(item));

minHeap.print();
console.log(minHeap.sort());

