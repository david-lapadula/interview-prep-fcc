function getPermutations(str) {
    if (str.length === 0) return ['']; 

    let permutations = [];

    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        let remainingString = str.slice(0, i) + str.slice(i + 1);
        let remainingPermutations = getPermutations(remainingString);

        for (let perm of remainingPermutations) {
          permutations.push(char + perm)
        }
    }

    return permutations;
}


function permAlone(str) {
  let total = 0; 
    function getPermutations(str) {
      if (str.length === 0) return ['']; 

      let permutations = [];

      for (let i = 0; i < str.length; i++) {
          let char = str[i];
          let remainingString = str.slice(0, i) + str.slice(i + 1);
          let remainingPermutations = getPermutations(remainingString);

          for (let perm of remainingPermutations) {
            permutations.push(char + perm)
          }
      }

      return permutations;
    }

    let permutations = getPermutations(str);

    for (let perm of permutations) {
      let hasDuplicate = false;
      for (let i = 0; i < perm.length - 1; i++) {
          if (perm[i] === perm[i + 1]) hasDuplicate = true;
      }
      
      if (!hasDuplicate) total++;
    }

    return total; 

}
  
  
console.log(permAlone('aab'));