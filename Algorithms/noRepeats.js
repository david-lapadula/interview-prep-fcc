/*
  - Permutation is all possible arrangements of characters
  - Found by placing an element at the front and getting the permutations of what remains
  - Recursion leverages call stack. Push stack onto frame with context and return point, when its called its popped off the stack
  - n! run time because the first spaace has n choices, the second has (n - 1)
    - n! applies to only cases where there are no duplicates otherwise its n^n
  - Regex: concise, but overhead of regex engine/compilation
    - () captures whatver is inside of it, '.' matches everything except new line, \ means reuse previous group, \1 means first capturing group
  - Loop: More verbose but faster because less over head. Marginal and maybe only for long string
*/

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

function hasDuplicateCharacters_Loop(str) {
  let hasDuplicate = false; 

   for (let i = 0; i < perm.length - 1; i++) {
          if (perm[i] === perm[i + 1]) {
            hasDuplicate = true;
            break
          }
      }
      
    return hasDuplicate;
}

function hasDuplicateCharacters_Regex(str) {
  return /(.)\1/.test(str);
}

function permAlone(str) {
  let total = 0; 

    let permutations = getPermutations(str);

    for (let perm of permutations) {
      if (!hasDuplicateCharacters_Regex(perm)) {
          total++; 
      }
    }

    return total; 

}
  
  
console.log(permAlone('aab'));