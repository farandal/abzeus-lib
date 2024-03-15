import { ITriniGroup } from "./trini";

export const forEachWord = (
  phrase: string,
  callback: (word: string, i: number) => void
) => {
  const words = phrase.split(" ");
  for (let i = 0; i < words.length; i++) {
    const word = words[i].trim();
    if (word.length > 0) {
      callback(word, i);
    }
  }
};

export const isPalindrome = (word: string): boolean => {
  const reversed = word.split("").reverse().join("");
  return word === reversed;
};

export const joinTrinitarianGroupKeys = (trinitarianObject: ITriniGroup): string => {
    return `${trinitarianObject.suj || ""}${trinitarianObject.eto || ""}${trinitarianObject.obj || ""}`;
}

export function* forEachChar(str: string): Generator<string, void, unknown> {
    let index = 0;
    while (index < str.length) {
      yield str[index];
      index++;
    }
  }