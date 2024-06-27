/*
    Symmetric difference of sets is the set of items which are in either but not in both
    Operation is binary, so between 3 elements, diff 1,2 and then diff that with 3
*/


// suboptimal. O(n * m * d), where n is the args length, m is values length, d is each operation in values loop (includes, indexOf, splice)
function sym(...args) {
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

  // improved. O(n * m) where n is the length of sets, and m is items length
  function improvedSym(...sets) {
      let map = new Map();

      sets.forEach(set => {
        let items = [...new Set(set)]; // remove duplicates
          items.forEach(item => {
              map.set(item, (map.get(item) || 0) + 1); // use map to reduce linear searches of sym()
          });
      });
  
      let diff = new Set();
      // worst case could be n * m items if all items in every set are unique
      map.forEach((count, item) => {
        // odd number means it is unpaired and should be included in symmetric difference
          if (count % 2 !== 0) {
              diff.add(item);
          }
      });
  
      return [...diff];

  }
  
  console.log(improvedSym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]));