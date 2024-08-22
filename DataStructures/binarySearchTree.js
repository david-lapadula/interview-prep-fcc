/*
  - Tree does not need to be ordered descending or ascending
  - Left subtree just needs to be smaller, and right sub tree needs to be larger
  - Code just needs to check which subtree it should be belong and then set the value when that subtree is null
    - Only adding leaf nodes, just need to find the right one
  - Left most leaf node will be min, right most leaf node will be max
  - Searching by cutting the list in half means the search time is proportional to the logarithm of the total nodes in the tree
    - Worst case is linear because could be unbalanced
  - Height is distance from root to any leaf node, referring to entire tree
      - Min height would be shortest distance, Max height would be longest
      - Balanced means leaf nodes are at most one level apart
      - AVL, red-black trees rebalance for insertions and deletions to maintain efficiency
  - Depth
      - How far node is from root, referring to specific node
  - findMinHeight
    - Just need to find the FIRST leaf node
    - BFS: Add to queue and increment depth for level, when leaf is found, return depth
    - DFS: Watch return for node has one child, need to count side with child and ignore null because its not a leaf
  - Recursive function calls need to hit base case to return, so will go down left side first

  
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

  this.findMinHeightBFS = function() {
    if (!this.root) {
      return -1;
    }

    let queue = [{ node: this.root, depth: 0 }];

    while (queue.length > 0) {
        let { node, depth } = queue.shift();

        if (!node.left && !node.right) {
            return depth;
        }

        if (node.left) {
            queue.push({ node: node.left, depth: depth + 1 });
        }

        if (node.right) {
            queue.push({ node: node.right, depth: depth + 1 });
        }
    }
   
  }

  this.findMinHeightDFS = function() {
    if (!this.root) return -1;
  
    function findNodeMinHeight(node) {
      if (!node) return 0; 
  
      if (!node.left && !node.right) return 0;

      if (!node.left) return 1 + findNodeMinHeight(node.right);
      if (!node.right) return 1 + findNodeMinHeight(node.left);
  
      return 1 + Math.min(
        findNodeMinHeight(node.left),
        findNodeMinHeight(node.right)
      );
    }
  
    return findNodeMinHeight(this.root);
  }


  this.findMaxHeightDFS = function() {
    if (!this.root) return -1;
  
    function findNodeMaxHeight(node) {
      if (!node) return 0; 
  
      if (!node.left && !node.right) return 0;

      if (!node.left) return 1 + findNodeMaxHeight(node.right);
      if (!node.right) return 1 + findNodeMaxHeight(node.left);
  
      return 1 + Math.max(
        findNodeMaxHeight(node.left),
        findNodeMaxHeight(node.right)
      );
    }
  
    return findNodeMaxHeight(this.root);
  }

  this.isBalanced = function() {
    if (!this.root) {
      return true;
    }

    let minHeight = this.findMinHeightDFS();
    let maxHeight = this.findMaxHeightDFS();

    return (maxHeight - minHeight) <= 1;
  }

}


function isBinarySearchTree(tree) {
  if (!tree.root) return true;

  function isBadDirection(node, direction) {
    if (!node[direction]) return false;

    return (direction === "left"
             ? (node.value <= node.left.value)
             : (node.value >= node.right.value)) ||
             !isGoodTree(node[direction])
  }

  function isGoodTree(node) {
    if (isBadDirection(node, "left")) return false;
    if (isBadDirection(node, "right")) return false;
    return true;
  }

  return isGoodTree(tree.root);
}


let binarySearchTree = new BinarySearchTree();
binarySearchTree.add(8);
binarySearchTree.add(3);
binarySearchTree.add(10);
binarySearchTree.add(2);
binarySearchTree.add(1);
binarySearchTree.add(6);
binarySearchTree.add(4);
binarySearchTree.add(7);
binarySearchTree.add(14);
binarySearchTree.add(13);
binarySearchTree.add(15);


console.log(binarySearchTree.findMinHeightDFS());
console.log(binarySearchTree.findMaxHeightDFS());
console.log(binarySearchTree.isBalanced());


