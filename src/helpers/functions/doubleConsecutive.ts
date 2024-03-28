
export const doubleConsecutiveLetters = (str:string) => {
    const result = [];
    for (let i = 0; i < str.length - 1; i++) {
      if (str[i] === str[i + 1]) {
        result.push(i);
      }
    }
    return result;
  }

  export default doubleConsecutiveLetters;