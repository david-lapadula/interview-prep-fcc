/*
    - Works with nodes, each node has a pointer and some data
    - O(n) access but good for adding and deleting because do not need to resize
    - When removing, keep a pointer to previous and current (previous.next). If current is null, at then end of the list
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
}


let linkedList = new LinkedList();
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
linkedList.add(4);
linkedList.add(5);

linkedList.remove(4);
