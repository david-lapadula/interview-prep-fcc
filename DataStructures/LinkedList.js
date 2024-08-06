/*
    - Works with nodes, each node has a pointer and some data
    - O(n) access but good for adding and deleting because do not need to resize
    - When removing, keep a pointer to previous and current (previous.next). If current is null, at the end of the list
    - For elementAt, exiting the for loop with the next value in current, so need to terminate at i < index
    - Define current inside loop, and then reset previous at the end to maintain reference to previous element
    - For removeAt, iterate until node before index to keep reference to the Node previous to that which should be remove. When iteration ends, currentNode is previous and remove next node
*/

class Node {
    constructor (element) {
        this.element = element;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.listHead = null;
        this.listLength = 0;
    }

    head() {
        return this.listHead;
    }

    length() {
        return this.listLength;
    }

    add(element) {
        let node = new Node(element);

        if (this.length() === 0) {
            this.listHead = node;
        } else {
            let current = this.listHead;

            while (current.next !== null) {
                current = current.next;
            }
    
            current.next = node;
        }


        this.listLength++;
    }

    remove(element) {
        if (this.length() === 0) {
            return;
        }

        if (this.listHead.element === element) {
            this.listHead = this.listHead.next;
            return this.listLength--;
        }

        let previous = this.listHead;

        while(previous) {
            let current = previous.next;

            if (current) {
                if (current.element === element) {
                    previous.next = current.next;
                    return this.listLength --;
                }
            }

            previous = current;
        }
    }

    isEmpty() {
        return this.length() === 0;
    }

    indexOf(element) {
        let current = this.listHead;
        let index = 0

        while (current !== null) {
            if (current.element === element) {
                return index;
            }

            index++;
            current = current.next;
        }

        return -1;
    }

    elementAt(index) {
        if (index >= this.length()) {
            return undefined;
        }

        let current = this.listHead; 

        for (let i = 0; i < index; i++) {
            current = current.next;
        }

        return current.element;
    }

    removeAt(index) {
        if (index < 0 || index >= this.length()) {
            return ;
        }

        if (index === 0) {
            let element = this.listHead.element;
            this.listHead = this.listHead.next;
            this.listLength--;
            return element
        }

        let currentNode = this.listHead.next;
        let currentIndex = 1;

        while (currentIndex < index - 1) {
            currentNode = currentNode.next;
            currentIndex++;
        }

        let element = currentNode.next.element;
        currentNode.next = currentNode.next.next;
        this.listLength--;
        return element;
    }

}


let linkedList = new LinkedList();
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
linkedList.add(4);
linkedList.add(5);

console.log(linkedList.removeAt(2));
console.log(linkedList.length());
