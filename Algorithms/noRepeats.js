function permAlone(str) {
    if (str.length === 0) return ['']; // base call will be reached for each letter in the string

    let permutations = [];

    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        let remainingString = str.slice(0, i) + str.slice(i + 1); // get rid of current character. slice(x, y) will keep everything before but not include index of y, slice(z) wil remove z numbers from the front
        let remainingPermutations = permAlone(remainingString);

        for (let perm of remainingPermutations) {
          permutations.push(char + perm)
        }
    }

    return permutations;
  }
  
  
console.log(permAlone('abc'));