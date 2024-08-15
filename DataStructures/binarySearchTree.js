/*
  - Tree does not need to be ordered descending or ascending
  - Left subtree just needs to be smaller, and right sub tree needs to be larger
  - Code just needs to check which subtree it should be belong and then set the value when that subtree is null
    - Only adding leaf nodes, just need to find the right one
  - Left most leaf node will be min, right most leaf node will be max
  - Searching by cutting the list in half means the search time is proportional to the logarithm of the total nodes in the tree
    - Worst case is linear because could be unbalanced
*/

var displayTree = tree => console.log(JSON.stringify(tree, null, 2));

function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
function BinarySearchTree() {
  this.root = null;

  this.add = function(newValue) {
    let newNode = new Node(newValue);

    if (!this.root) {
        this.root = newNode;
        return undefined;
    }

    let currentNode = this.root;

    while (currentNode) {
      if (currentNode.value === newNode.value) {
        return undefined;
      }

      const direction = currentNode.value > newNode.value ? "left" : "right";

      if (!currentNode[direction]) {
        currentNode[direction] = newNode;
        return undefined;
      }

      currentNode = currentNode[direction];
    }
  }

  this.findMin = function() {

    if (!this.root) {
      return null;
    }

    let current = this.root;

    while (current.left !== null) {
      current = current.left;
    }

    return current.value;
  }

  this.findMax = function() {
    if (!this.root) {
      return null;
    }

    let current = this.root;

    while (current.right !== null) {
      current = current.right;
    }

    return current.value;
  }

  this.isPresent = function(value) {
    if (!this.root) {
      return false;
    }

    let current = this.root;

    while (current && current.value !== value) {
      if (current.value > value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    
    return !!current;
  }

}

let binarySearchTree = new BinarySearchTree();
binarySearchTree.add(8);
binarySearchTree.add(3);
binarySearchTree.add(10);
binarySearchTree.add(1);
binarySearchTree.add(6);
binarySearchTree.add(4);
binarySearchTree.add(7);
binarySearchTree.add(14);
binarySearchTree.add(13);

console.log(binarySearchTree.findMin())
console.log(binarySearchTree.findMax())
console.log(binarySearchTree.isPresent(7))
console.log(binarySearchTree.isPresent(5))

