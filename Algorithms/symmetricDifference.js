/*
    - Symmetric difference of sets is the set of items which are in either but not in both
    - Operation is binary, so between 3 elements, diff 1,2 and then diff that with 3
    - suboptimalSym: O(n * m * d), where n is the args length, m is values length, d is each operation in values loop (includes, indexOf, splice)
    - improvedSym: O(n * m) where n is the length of sets, and m is items length
        - map reduces linear searches of sym
        - worst case of map.forEach is (n * m) if all items unique
        - odd count means it is unpaired and included in symmetric difference
*/

function suboptimalSym(...args) {
    let diff = [];

    if ([0, 1].includes(args.length)) {
        return args;
    }

    for (let item in args) {
        let values = [...new Set(args[item])];

        values.forEach(element => {
            if (diff.includes(element)) {
                let index = diff.indexOf(element);
                if (index !== -1) {
                    diff.splice(index, 1);
                  }  
            } else {
                diff.push(element);
            }
        });
    }
    

    return diff;
  }

  function improvedSym(...sets) {
      let map = new Map();

      sets.forEach(set => {
        let items = [...new Set(set)]; 
          items.forEach(item => {
              map.set(item, (map.get(item) || 0) + 1);
          });
      });
  
      let diff = new Set();
      map.forEach((count, item) => {
          if (count % 2 !== 0) {
              diff.add(item);
          }
      });
  
      return [...diff];

  }
  
  console.log(improvedSym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]));