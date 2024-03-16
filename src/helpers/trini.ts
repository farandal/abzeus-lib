import Translator from "../classes/Translator";
import IABZeusTranslatorConfig from "../interfaces/IABZeusTranslatorConfig";
import { ITrinitarianGroup } from "../interfaces/IABZeusTrinitarianGroup";
import { isPalindrome } from "./text";

const debug = false;
const groupByTwo = (arr: any, key1: string, key2: string) =>
  arr.reduce((objectsByKeyValue: any, obj: any) => {
    const value1 = obj[key1];
    const value2 = obj[key2];
    const key = `${value1}-${value2}`;
    objectsByKeyValue[key] = (objectsByKeyValue[key] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

const groupByAttr = (arr: any, key: number | string) =>
  arr.reduce((objectsByKeyValue: any, obj: any) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

export function groupBy<T>(
  arr: T[],
  callback: (item: T) => string
): { [key: string]: T[] } {
  const result: { [key: string]: T[] } = {};

  arr.forEach((item) => {
    const key = callback(item);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(item);
  });

  return result;
}

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
/**
 * @description given a word returns a trinitarian array e.g: "consciousness", returns ['con','sci','ous','ness']
 * @param input
 * @returns
 */
export const splitIntoTrinitarianGroups = (input: string): string[] => {
  let trinitarianGroups: string[] = [];
  let tempGroup: string[] = [];
  //const debug = false;

  const palindromes = findTrinitarianPalindromes(input);
  //const palindromes = [findTrinitarianPalindromes(input)[0]];
  // Only the first palindrome found is considered in the algorithm

  debug && console.log("palindromes found", palindromes);

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
      debug &&
        console.log(`updating reader:${reader}, triCounter:${triCounter}`);
    } else {
      debug &&
        console.log(`reader:${reader}, added ${currentLetter} to temp group. `);
      debug &&
        console.log(`updating reader:${reader}, triCounter:${triCounter}`);
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
      debug &&
        console.log(
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

/**
 * @description Given a trinitarianArray:string[] returns the formatted Trinitarian group
 * e.g: { suj: [ 'con', 'sci', 'ous' ], eto: [ 'ness' ], obj: undefined }
 * @param arr
 * @returns
 */
export const FormatTriniGroup = (
  arr: string[] | string,
  parentIndex: number,
  index?: number
): ITrinitarianGroup => {
  //const debug = false;
  if (!index) index = 0;

  const _tri = !Array.isArray(arr) ? Array.from(arr) : arr;

  if (_tri.length > 3) {
    debug && console.log(_tri.join(""));
    const palindrome = findTrinitarianPalindromes(_tri.join(""));

    // More than one palindrome could exists is one word. e.g: 'ataraxia'; [ata] and [ara];
    // Only the first found is considered in this algorithm, if found.
    debug && console.log("palindrome found ", palindrome);

    if (palindrome.length > 0) {
      // TODO: Assumed only one palindrome by trinitarian group
      const palindromeIndex = palindrome[0][1][0];
      const palindromeContent = palindrome[0][0];

      if (palindromeIndex === 0) {
        const res = {
          suj: _tri.slice(0, 3),
          eto: _tri.slice(3, 5),
          obj: _tri.slice(5),
          p_idx: palindromeIndex,
          c_idx: index,
        };

        debug && console.log("palindrome index 0", arr, res);

        return res;
      } else if (palindromeIndex === 1) {
        const res = {
          suj: _tri.slice(0, 1),
          eto: _tri.slice(1, 4),
          obj: _tri.slice(4),
          p_idx: palindromeIndex,
          c_idx: index,
        };
        debug && console.log("palindrome index 1", arr, res);
        //console.log("FormatTriniGroup", arr, res);
        return res;
      } else if (palindromeIndex === 2) {
        const res = {
          suj: _tri.slice(0, 1),
          eto: _tri.slice(1, 2),
          obj: _tri.slice(2),
          p_idx: palindromeIndex,
          c_idx: index,
        };
        debug && console.log("palindrome index 2", arr, res);
        //console.log("FormatTriniGroup", arr, res);
        return res;
      }
    }
  }
  //}
  /*console.log("FormatTriniGroup", arr, {
    suj: arr[0],
    eto: arr[1],
    obj: arr[2],
  });*/
  return {
    suj: _tri[0],
    eto: _tri[1],
    obj: _tri[2],
    p_idx: parentIndex,
    c_idx: index,
  };
};

export const FormatTriniGroups = (
  arr: string[],
  index?: number
): ITrinitarianGroup[] => {
  if (!index) index = 0;

  const _arr = !Array.isArray(arr) ? Array.from(arr) : arr;
  const trinitarianGroups: ITrinitarianGroup[] = [];

  //const debug = false;

  if (_arr.length > 1) {
    const palindrome = findTrinitarianPalindromes(_arr.join(""));

    // More than one palindrome could exists is one word. e.g: 'ataraxia'; [ata] and [ara];
    // Only the first found is considered in this algorithm, if found.
    debug && console.log("PAL FOND ", palindrome);

    if (palindrome.length > 0) {
      // TODO: Assumed only one palindrome by trinitarian group
      const palindromeIndex = palindrome[0][1][0];
      const palindromeContent = palindrome[0][0];

      if (palindromeIndex === 0) {
        const res: ITrinitarianGroup = {
          suj: _arr.slice(0, 3) as unknown as string[],
          eto: _arr.slice(3, 5) as unknown as string[],
          obj: _arr.slice(5) as unknown as string[],
          p_idx: index,
          c_idx: palindromeIndex,
        };
        debug && console.log("PAL IDX 0", arr, res);
        trinitarianGroups.push(res);
      } else if (palindromeIndex === 1) {
        const res = {
          suj: _arr.slice(0, 1) as unknown as string[],
          eto: _arr.slice(1, 4) as unknown as string[],
          obj: _arr.slice(4) as unknown as string[],
          p_idx: index,
          c_idx: palindromeIndex,
        };
        debug && console.log("PAL IDX 1", arr, res);
        //console.log("FormatTriniGroup", arr, res);
        trinitarianGroups.push(res);
      } else if (palindromeIndex === 2) {
        const res = {
          suj: _arr.slice(0, 1) as unknown as string[],
          eto: _arr.slice(1, 2) as unknown as string[],
          obj: _arr.slice(2) as unknown as string[],
          p_idx: index,
          c_idx: palindromeIndex,
        };
        debug && console.log("PAL IDX 2", arr, res);
        //console.log("FormatTriniGroup", arr, res);
        trinitarianGroups.push(res);
      }
    }
  }

  trinitarianGroups.push({
    suj: _arr[0] as unknown as string[],
    eto: _arr[1] as unknown as string[],
    obj: _arr[2] as unknown as string[],
    p_idx: index,
    c_idx: 0,
  });

  debug && console.log("TRINITARIAN GROUPS", trinitarianGroups);
  return [FormatTriniGroup(arr, 0)];
};

const removeExtraBracket = (arr: any[]) => {};

const format = (arr: any, obj?: any, index?: number): any => {
  if (!index) index = 0;

  let trini: any = {};

  let _arr = !Array.isArray(arr) ? Array.from(arr) : arr;

  while (_arr.length === 1) {
    _arr = _arr[0];
  }

  trini.trini = _arr;
  if (_arr[index])
    trini.suj = _arr[index].length > 1 ? format(_arr[index]) : _arr[index];
  if (_arr[index + 1])
    trini.eto =
      _arr[index + 1].length > 1 ? format(_arr[index + 1]) : _arr[index + 1];
  if (_arr[index + 2])
    trini.obj =
      _arr[index + 2].length > 1 ? format(_arr[index + 2]) : _arr[index + 2];
  if (!obj) {
    obj = trini;
  } else if (obj && obj.value && obj.value !== trini.value) {
    obj = { ...obj, trini };
  }

  index += 2;
  if (index < arr.length) {
    return format(arr, obj, index);
  } else {
    debug && console.log("FORMAT", obj);
    return obj;
  }
};

const flatTrini = (arr: any) => {
  if (Array.isArray(arr)) {
    return arr.reduce(
      (acc: any[], val: any) => acc + (Array.isArray(val) ? val.join("") : val),
      ""
    );
  } else {
    return arr;
  }
};

const parseNodeLinks = (obj: any) => {
  let nodes = obj.nodes;
  let links = obj.links;

  const uniqueNodes = nodes.reduce((acc: any, item: any) => {
    if (!acc.some((accItem: any) => accItem.id === item.id)) {
      acc.push(item);
    }
    return acc;
  }, []);

  const levels = groupByAttr(obj.nodes, "group");
  const levelsKeys = Object.keys(levels);

  for (let l = 0; l < levelsKeys.length; l++) {
    let levelGroup = levels[levelsKeys[l]];
    //console.log("levelGroup", levelGroup);
    for (let i = 0; i < levelGroup.length; i++) {
      let item = levelGroup[i];
      if (item.parent) {
        links.push({
          source: item.parent,
          target: item.id,
        });
      }
    }
  }

  obj.nodes = uniqueNodes;
  obj.links = links;

  return obj;
};

const findParentIdFromPreviousGroup = (nodes: any[], group: number) => {
  let parent = nodes.find((item: any) => item.group === group);
  return parent && parent.id ? parent.id : null;
};

const nodeTree = (
  config: IABZeusTranslatorConfig,
  arr: any,
  nodes?: any,
  links?: any,
  obj?: any,
  index?: number,
  nodeIndex?: number,
  level?: number,
  parent?: number,
  type?: "eto" | "suj" | "obj" | "trini" | null
): any => {
  const translator = new Translator();

  const translate = (word: string) => {
    const trinitarianGroups = FormatTriniGroups(
      splitIntoTrinitarianGroups(word)
    );
    let output = "";
    //console.log("translating groups",trinitarianGroups)
    for (let i = 0; i < trinitarianGroups.length; i++) {
      const translation = translator.trinitarian(trinitarianGroups[i], {
        ...config,
        ...{ inlineDetail: true },
      });
      output += translation;
      //console.log("subtranslating w:",word," g:",trinitarianGroups[i]," output:",)
    }

    return output;
  };

  if (!type) type = null;
  if (!level) level = 0;
  if (!index) index = 0;
  if (!nodeIndex) nodeIndex = 0;
  if (!nodes) nodes = [];
  if (!links) links = [];

  let trini: any = {};

  let _arr = !Array.isArray(arr) ? Array.from(arr) : arr;

  while (_arr.length === 1) {
    _arr = _arr[0];
  }

  trini.trini = _arr;

  let tempNodes: any[] = [];
  let tempLinks: any[] = [];

  if (index === 0) {
    nodeIndex++;

    /* console.log(config,typeof trini === "object"
    ? trini.trini
    : trini);*/

    const name = flatTrini(trini.trini);
    const n = {
      id: nodeIndex,
      name: name,
      val: trini,
      type: type || "trini",
      group: level,
      parent:
        level === 0 ? null : findParentIdFromPreviousGroup(nodes, level - 1),
      ...(type && (config.nestedTranslation || level > 0)
        ? { translation: translate(name) }
        : { translation: null }),
    };
    tempNodes.push(n);
    debug && console.log(`appending main node ${n.id} ${n.name}`);
  }
  const parentNodeIndex = nodeIndex;
  if (_arr[index]) {
    if (typeof trini.suj !== "object") {
      if (_arr[index].length > 1) {
        const _suj = nodeTree(
          config,
          _arr[index],
          tempNodes,
          null,
          obj,
          index,
          nodeIndex + 1,
          level + 1,
          parent,
          "suj"
        );
        nodeIndex = Number(_suj.nodeIndex);
        //level = Number(_suj.level);
        trini.suj = _suj.suj;
        //console.log("_suj", _arr[index], trini.suj);
        tempNodes = [...tempNodes, ..._suj.nodes];
        tempLinks = [...tempLinks, ..._suj.links];
        //console.log("_suj.nodes",_suj.nodes);
      } else {
        nodeIndex++;
        trini.suj = _arr[index];

        const name =
          typeof trini.suj === "object"
            ? flatTrini(trini.suj.trini)
            : flatTrini(trini.suj);
        const o = {
          id: nodeIndex,
          name: name,
          val: trini.suj,
          type: "suj",
          group: Number(`${level + 1}${parentNodeIndex}`),
          parent: parentNodeIndex,
          ...(config.nestedTranslation
            ? { translation: translate(name) }
            : { translation: null }),
        };
        tempNodes.push(o);
        debug && console.log(`appending node ${o.id} ${o.name}`);
        tempNodes.push(o);

        debug &&
          console.log(
            `linking ${parentNodeIndex} ${trini.trini} with ${nodeIndex} : ${o.name}`
          );

        tempLinks.push({
          source: parentNodeIndex,
          target: nodeIndex,
        });
      }
      //nodeIndex++;
    }
  }

  if (_arr[index + 1]) {
    if (typeof trini.eto !== "object") {
      if (_arr[index + 1] && _arr[index + 1].length > 1) {
        const _eto = nodeTree(
          config,
          _arr[index + 1],
          tempNodes,
          null,
          obj,
          index,
          nodeIndex + 1,
          level + 1,
          parent,
          "eto"
        );
        nodeIndex = Number(_eto.nodeIndex);
        //level = Number(_eto.level);
        trini.eto = _eto.obj;
        //console.log("_eto", _arr[index + 1], trini.eto);
        tempNodes = [...tempNodes, ..._eto.nodes];
        tempLinks = [...tempLinks, ..._eto.links];
        //console.log("_eto.modes",_eto.nodes);
      } else {
        nodeIndex++;
        trini.eto = _arr[index + 1];
        const translator = new Translator();
        //console.log(trini.eto)
        const name =
          typeof trini.eto === "object"
            ? flatTrini(trini.eto.trini)
            : flatTrini(trini.eto);

        const o = {
          id: nodeIndex,
          name: name,
          val: trini.eto,
          type: "eto",
          group: Number(`${level + 1}${parentNodeIndex}`),
          parent: parentNodeIndex,
          ...(config.nestedTranslation
            ? { translation: translate(name) }
            : { translation: null }),
        };

        debug && console.log(`appending node ${o.id} ${o.name}`);
        tempNodes.push(o);

        debug &&
          console.log(
            `linking ${parentNodeIndex} ${trini.trini} with ${nodeIndex} : ${o.name}`
          );
        tempLinks.push({
          source: parentNodeIndex,
          target: nodeIndex,
        });
      }
      //nodeIndex++;
    }
  }

  if (_arr[index + 2]) {
    if (typeof trini.obj !== "object") {
      if (_arr[index + 2] && _arr[index + 2].length > 1) {
        const _obj = nodeTree(
          config,
          _arr[index + 2],
          tempNodes,
          null,
          obj,
          index,
          nodeIndex + 1,
          level + 1,
          parent,
          "obj"
        );
        nodeIndex = Number(_obj.nodeIndex);
        trini.obj = _obj.obj;
        tempNodes = [...tempNodes, ..._obj.nodes];
        tempLinks = [...tempLinks, ..._obj.links];
      } else {
        nodeIndex++;
        trini.obj = _arr[index + 2];
        const name =
          typeof trini.obj === "object"
            ? flatTrini(trini.obj.trini)
            : flatTrini(trini.obj);
        const o = {
          id: nodeIndex,
          name: name,
          val: trini.obj,
          type: "obj",
          group: Number(`${level + 1}${parentNodeIndex}`),
          parent: parentNodeIndex,
          ...(config.nestedTranslation
            ? { translation: translate(name) }
            : { translation: null }),
        };
        debug && console.log(`appending node ${o.id} ${o.name}`);
        tempNodes.push(o);
        debug &&
          console.log(
            `linking ${parentNodeIndex} ${trini.trini} with ${nodeIndex} : ${o.name}`
          );
        tempLinks.push({
          source: parentNodeIndex,
          target: nodeIndex,
        });
      }
    }
  }

  if (!obj) {
    obj = trini;
    nodes = tempNodes;
    links = tempLinks;
  } else if (obj && obj.value && obj.value !== trini.value) {
    obj = { ...obj, trini };
    nodes = [...nodes, ...tempNodes];
    links = [...links, ...tempLinks];
  }

  index += 3;

  if (index < _arr.length) {
    return nodeTree(
      config,
      _arr,
      nodes,
      links,
      obj,
      index,
      nodeIndex,
      level,
      parent
    );
  }

  return {
    arr: _arr,
    nodes: nodes,
    links: links,
    obj: obj,
    index: index,
    nodeIndex: nodeIndex,
    level: level,
    parent: parent,
  };
};

const group = (arr: any[]): any => {
  const result = [];
  let current = [];
  for (let i = 0; i < arr.length; i++) {
    current.push(arr[i]);
    if (current.length === 3 || i === arr.length - 1) {
      result.push(current);
      current = [];
    }
  }
  debug && console.log("GROUP", result);
  return result;
};

const trini = (arr: any[], obj?: any[], index?: number): any => {
  if (!obj) obj = [];
  if (!index) index = 0;

  let current = [];
  let reader = 0;

  const _arr = !Array.isArray(arr) ? Array.from(arr) : arr;

  //current = [arr[index], arr[index + 1], arr[index + 2]];
  if (_arr[index]) current.push(_arr[index]);
  if (_arr[index + 1]) current.push(_arr[index + 1]);
  if (_arr[index + 2]) current.push(_arr[index + 2]);

  obj = [...obj, current];

  index += 3;
  reader++;

  if (index < _arr.length) {
    return trini(_arr, obj, index);
  } else {
    debug && console.log("TRINI", obj);
    return obj;
  }
};

export {
  trini as trini,
  group as group,
  format as format,
  nodeTree as nodeTree,
  parseNodeLinks as parseNodeLinks,
};
