/*
    - More expensive than singly linked list because need to store reference to next and previous
    - Previous value of head should be tail, but next value of tail should be null
      - Design choice if previous of head should be tail or null. Could be either
    - Storing tail more efficient because dont need tail to get it
    - When removing, need to point previous to next and current next to current previous to remove from the chain
    - When reversing
      - Set tail at the beginning because will lose reference to head once iteration is done
      - Store ref to prev and then flip pointers because have reference to next
      - Start with prev and next as null, this way the first item's 'next' becomes null. It will eventually be the tail, so this is correct
      - Head will get set to the last prev value, which will be the last non-null node
 */


var Node = function(data, prev) {
    this.data = data;
    this.prev = prev;
    this.next = null;
  };


var DoublyLinkedList = function() {
    this.head = null;
    this.tail = null;


    this.add = function (data) {
      let node = new Node(data, this.tail);
      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        let tempNode = this.tail;
        tempNode.next = node;
        this.tail = node;
      }
    };

    this.remove = function(data) {
      if (!this.head) {
        return null;
      }

      let current = this.head;

      while (current.next !== null) {

        if (current.data === data) {

          if (current.prev === null) {
            this.head = this.head.next
            this.head.prev = null;
          } else {
            let prev = current.prev;
            let next = current.next;

            prev.next = next;
            next.prev = prev;
          }

        }

        current = current.next
      }
     
      if (current.data === data) {
        this.tail = current.prev;
        prev.next = null;
      }

    }

    this.reverse = function() {
      if (!this.head) {
        return null;
      }
    
      let current = this.head;
      this.tail = this.head;
      let prev = null;
      let next = null; 

      while (current !== null) {
        next = current.next;

        current.next = prev;
        current.prev = next;
        
        prev = current;
        current = next;
      }
    
      this.head = prev; 
      this.head.prev = null;
      this.tail.next = null;
    };
    

    this.print = function() {
      let current = this.head;

      while (current.next !== null) {
        console.log(current.data);
        console.log(current.prev ? current.prev.data : null);
        console.log(current.next ? current.next.data : null);
        console.log('-------------------------------');
        current = current.next
      }

      console.log(current.data);
      console.log(current.prev ? current.prev.data : null);
      console.log(current.next ? current.next.data : null);
      console.log('-------------------------------');
    }


};

let doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.add(1);
doublyLinkedList.add(2);
doublyLinkedList.add(3);
doublyLinkedList.add(4);
doublyLinkedList.add(5);

doublyLinkedList.reverse();

doublyLinkedList.print();