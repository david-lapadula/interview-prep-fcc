/*
    - Heap property is that all parent nodes are either greater or less than child 
        - Goal is to maintain this specific order but not global order of all nodes
    - Complete tree where all levels are full except last which is filled left to right
        - Arithmetic rule: Left: i * 2, Right: i * 2 + 1, Parent Math.floor(i / 2)
        - Always i nodes before i. So multiplying by 2 will give you children and dividing by 2 is just opposite so it will give you parent
    - Benefits
        - Easily find max/min
        - Balanced tree leads to logarithmic operations
        - Arithmetic condition means can be stored as an array
        - Reduce memory because no reference to child nodes
    - Heapify up (insertion)
        - Add to the end, leftest child is smallest element. Get parent and swap if breaks heap condition
    - Heapify down (remove largest)
        - Insert at 1st index, so largest element, place smallest element at 1, replace with larger of children if smaller than the children until complete
        - Check if left is large first because it will be smaller of the values
        - If left or right is greater than the length of the array then you are at the last row
*/

let MaxHeap = function () {
    this.heap = [null];

    this.print = () => [...this.heap];

    this.insert = (item) => {
        this.heap.push(item);

        let index = this.heap.length - 1;
        let parentIndex = Math.floor(index / 2);

        while (index > 1 && item > this.heap[parentIndex]) {
            this.heap[index] = this.heap[parentIndex];
            this.heap[parentIndex] = item;

            index = parentIndex;
            parentIndex = Math.floor(index / 2);
        }
    }


    this.remove = () => {
        this.heap = [...this.heap];
        let max = this.heap[1];
        let last = this.heap.pop();
        this.heap[1] = last;
        this.heapify(1);
        return max;
    }

    this.heapify = (i) => {
        let large = i;
        let l = 2 * i;
        let r = 2 * i + 1;
        let length = this.heap.length;

        if (l < length && this.heap[l] > this.heap[large]) {
            large = l;
        }

        if (r < length && this.heap[r] > this.heap[large]) {
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
};

let maxHeap = new MaxHeap();

maxHeap.insert(10);
maxHeap.insert(50);
maxHeap.insert(15);
maxHeap.insert(35);
maxHeap.insert(20);
maxHeap.insert(40);
maxHeap.insert(30);
maxHeap.insert(1000);

console.log(maxHeap.print());
// maxHeap.remove();
// console.log(maxHeap.print());