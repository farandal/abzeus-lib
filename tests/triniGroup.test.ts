// index.test.ts

import { splitIntoTrinitarianGroups } from "../src/helpers/trini";

// Install type definitions for the test runner
// npm i --save-dev @types/jest

describe("Split words function", () => {
  test("splits a word into trinitarian groups of three letters", () => {
    expect(splitIntoTrinitarianGroups("type")).toEqual(["typ", "e"]);
  });

  test("handles words with a length that is not a multiple of three", () => {
    expect(splitIntoTrinitarianGroups("hello")).toEqual(["hell", "o"]);
  });

  test("handles words with only one letter", () => {
    expect(splitIntoTrinitarianGroups("a")).toEqual(["a"]);
  });

  test("handles words with two letters", () => {
    expect(splitIntoTrinitarianGroups("it")).toEqual(["it"]);
  });

  test("handles words with a length greater than three", () => {
    expect(splitIntoTrinitarianGroups("typescript")).toEqual([
      "typ",
      "esc",
      "rip",
      "t",
    ]);
  });

  test("handles words with a length that is a multiple of three", () => {
    expect(splitIntoTrinitarianGroups("script")).toEqual(["scr", "ipt"]);
  });

  test("handles words with two consecutive letters at the end", () => {
    expect(splitIntoTrinitarianGroups("typescript")).toEqual([
      "typ",
      "esc",
      "rip",
      "t",
    ]);
  });
});
