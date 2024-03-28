import { isPalindrome } from "../text";

export const positionATrinitarianPalindrome = (
    palindromes: any[],
    value: number
  ) => {
    for (let i = 0; i < palindromes.length; i++) {
      const innerArr = palindromes[i];
      if (innerArr[1].includes(value)) {
        return innerArr;
      }
    }
    return null;
  };
  
  export const findTrinitarianPalindromeIndexes = (
    word: string,
    substring: string
  ): number[] => {
    const indexes: number[] = [];
    let index = -1;
    while ((index = word.indexOf(substring, index + 1)) !== -1) {
      indexes.push(index);
    }
    return indexes;
  };
  
  export const findTrinitarianPalindromes = (
    word: string
  ): [string, number[]][] => {
    const palindromes: [string, number[]][] = [];
  
    for (let i = 0; i < word.length; i++) {
      for (let j = i + 1; j <= word.length; j++) {
        const substring = word.slice(i, j);
        if (substring.length === 3 && isPalindrome(substring)) {
          const indexes = findTrinitarianPalindromeIndexes(word, substring);
          palindromes.push([substring, indexes]);
        }
      }
    }
    return palindromes;
  };
  
  
  export const findTrinitarianPalindromesIndexes = (
      word: string
    ): number[] => {
      const palindromesIndexes: number[] = [];
    
      for (let i = 0; i < word.length; i++) {
        for (let j = i + 1; j <= word.length; j++) {
          const substring = word.slice(i, j);
          if (substring.length === 3 && isPalindrome(substring)) {
            const indexes = findTrinitarianPalindromeIndexes(word, substring);
            palindromesIndexes.push(...indexes);
          }
        }
      }
      return palindromesIndexes;
    };
  
    export default {
        positionATrinitarianPalindrome,
        findTrinitarianPalindromeIndexes,
        findTrinitarianPalindromes,
        findTrinitarianPalindromesIndexes
    }