
import { ITrinitarianGroup } from "../../interfaces/IABZeusTrinitarianGroup";
import { findTrinitarianPalindromes } from "./trinitarianPalindromes";

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

    const debug = false;
    //console.log("FormatTriniGroup",arr);
    //const debug = false;
    if (!index) index = 0;
  
    const _tri = !Array.isArray(arr) ? Array.from(arr) : arr;
  
    if (_tri.length > 3) {
      //debug && console.log(_tri.join(""));
      const palindrome = findTrinitarianPalindromes(_tri.join(""));
      
      // More than one palindrome could exists is one word. e.g: 'ataraxia'; [ata] and [ara];
      // Only the first found is considered in this algorithm, if found.
      debug && console.log("palindrome found ", palindrome);
  
      if (palindrome.length > 0) {
        // TODO: Assumed only one palindrome by trinitarian group
        const palindromeIndex = palindrome[0][1][0];
        const palindromeContent = palindrome[0][0];
  
        if (palindromeIndex === 0) {
          const res:ITrinitarianGroup = {
            suj: _tri.slice(0, 3),
            eto: _tri.slice(3, 5),
            obj: _tri.slice(5),
            p_idx: palindromeIndex,
            c_idx: index,
            word: _tri.join("")
          };
          
         
         debug && console.log("palindrome index 0", arr, res);
  
          return res;
        } else if (palindromeIndex === 1) {
          const res:ITrinitarianGroup = {
            suj: _tri.slice(0, 1),
            eto: _tri.slice(1, 4),
            obj: _tri.slice(4),
            p_idx: palindromeIndex,
            c_idx: index,
            word: _tri.join("")
          };
          debug && console.log("palindrome index 1", arr, res);
          //console.log("FormatTriniGroup", arr, res);
          return res;
        } else if (palindromeIndex === 2) {
          const res:ITrinitarianGroup = {
            suj: _tri.slice(0, 1),
            eto: _tri.slice(1, 2),
            obj: _tri.slice(2),
            p_idx: palindromeIndex,
            c_idx: index,
            word: _tri.join("")
          };
          debug && console.log("palindrome index 2", arr, res);
          //console.log("FormatTriniGroup", arr, res);
          return res;
        }
      }
    }
    
    return {
      suj: _tri[0],
      eto: _tri[1],
      obj: _tri[2],
      word: _tri.join(""),
      p_idx: parentIndex,
      c_idx: index,
    };
  };
  
  export const FormatTriniGroups = (
    arr: string[],
    index?: number
  ): ITrinitarianGroup[] => {

    const debug = false;
    
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
            word: _arr.join("")
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
            word: _arr.join("")
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
            word: _arr.join("")
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
      word: _arr.join(""),
      p_idx: index,
      c_idx: 0,
    });
  
    debug && console.log("TRINITARIAN GROUPS", trinitarianGroups);
    return [FormatTriniGroup(arr, 0)];
  };


  export default {
    FormatTriniGroup,
    FormatTriniGroups
  }