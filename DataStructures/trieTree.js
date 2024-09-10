/*
    - Ordered search tree to hold strings, or assocative arrays where keyys are strings
    - Path to a node specifies a key; path itself is the key
    - Store data compactly because keys are shared; c-o-d-e and c-o-d-i-n-g share first three nodes
    - Metadata holds end of the key
    - Key is the letter and value is a node
    - When checking if a word exists, only true if root keys have letter, is last letter, and length is 1. If length > 1, end could signal a word within a word
    - For print() looping over keys prevents checking if an end node has any keys
    - For addWord and isWord passing root.keys[key] passes a reference to the next node
 */


var Node = function () {
    this.keys = new Map();
    this.end = false;

    this.setEnd = function () {
        this.end = true;
    };
    this.isEnd = function () {
        return this.end;
    };
};

var Trie = function () {
    this.root = new Node();

    this.add = (wordParam) => {

        function addWord(word, root) {
            if (word) {
                let letter = word[0];
                
                if (Object.keys(root.keys).includes(word[0])) {
                    addWord(word.substring(1), root.keys[letter])
                } else {
                    const node = new Node();

                    if (word.length === 1) {
                        node.setEnd();
                    }

                    root.keys[letter] = node;

                    addWord(word.substring(1), root.keys[letter])
                }
            }
        }

        addWord(wordParam, this.root);
    }

    this.isWord = function (word) {

        function hasWord(word, root) {
            let letter = word[0];

            if (Object.keys(root.keys).includes(letter)) {
                if (word.length === 1 && root.keys[letter].isEnd()) {
                    return true;
                } else {
                    return hasWord(word.substring(1), root.keys[letter])
                }
            } else {
                return false;
            }
        }

        return hasWord(word, this.root);
    }

    this.print = function () {
        let words = [];

        function getWords(node, substring) {
            for (let key of Object.keys(node.keys)) {
                getWords(node.keys[key], substring + key)
            }

            if (node.isEnd()) {
                words.push(substring);
            }
        }

        getWords(this.root, "", words);

        return words;
    }
};

var displayTree = tree => console.log(JSON.stringify(tree, null, 2));

let trie = new Trie()
trie.add('code');
trie.add('coder');
trie.add('coding');
trie.add('done');
trie.add('did');
trie.add('jump');
trie.add('jumps');
trie.add('jumped');
trie.add('house');
trie.add('mouse');
trie.add('hop');
trie.add('hops');
trie.add('hopped');
trie.add('hoppy');
trie.add('hope');

console.log(trie.print())