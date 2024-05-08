import { findTrinitarianPalindromes, positionATrinitarianPalindrome } from "./trinitarianPalindromes";

/**
 * @description given a word returns a trinitarian array e.g: "consciousness", returns ['con','sci','ous','ness']
 * @param input
 * @returns
 */
export const splitIntoTrinitarianGroups = (input: string): string[] => {

    const debug = false;
    
    let trinitarianGroups: string[] = [];
    let tempGroup: string[] = [];
    //const debug = false;
  
    const palindromes = findTrinitarianPalindromes(input);
    //const palindromes = [findTrinitarianPalindromes(input)[0]];
    // Only the first palindrome found is considered in the algorithm
  
    //debug && console.log("palindromes found", palindromes);
  
    //const modifiedInput = input.replace(/th/g, "t").replace(/ph/g, "f");
    
    const modifiedInput = input;
    let reader = 0;
    let triCounter = 0;
    let triGroupHasOnePalindrome = false;

    while (reader < modifiedInput.length) {
      const currentLetter = modifiedInput[reader];
      const nextLetter = modifiedInput[reader + 1];
  
      const trinitarianPalindromeAtPosition = positionATrinitarianPalindrome(
        palindromes,
        reader
      );
    
      if (trinitarianPalindromeAtPosition && !triGroupHasOnePalindrome) {
        debug &&
          console.log(
            `reader at ${reader}, added ${input.slice(
              reader,
              reader + 3
            )} to temp group. `
          );
        tempGroup.push(input.slice(reader, reader + 3));
        reader += 3; // jump two positions.
  
        // exception, if a plindrome is found at the first position, don't keep adding more letters to the group.
        if (triCounter === 0) {
          triCounter = 3;
        } else {
          triCounter++;
        }
  
        triGroupHasOnePalindrome = true;
        //debug && console.log(`updating reader:${reader}, triCounter:${triCounter}`);
      } else {
        //debug && console.log(`reader:${reader}, added ${currentLetter} to temp group. `);
        //debug && console.log(`updating reader:${reader}, triCounter:${triCounter}`);
  
        if (currentLetter === nextLetter) {
          tempGroup.push(currentLetter + currentLetter);
          reader += 2;
          triCounter++;
        } else {
          tempGroup.push(currentLetter);
          reader++;
          triCounter++;
        }
  
      }
  
      if (triCounter > 2) {
        debug && console.log(
            `trinitarian group ${tempGroup.join(
              ""
            )} added, reader:${reader} triCounter:${triCounter}`
          );
        //reader = 0;
        trinitarianGroups.push(tempGroup.join(""));
        tempGroup = [];
        triCounter = 0;
        triGroupHasOnePalindrome = false;
      }
    }
  
    if (tempGroup.length > 0) {
      trinitarianGroups.push(tempGroup.join(""));
    }
  
    return trinitarianGroups;
  };
  