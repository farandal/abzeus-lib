
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

  const palindromeAtIndex = (palindromes:[string, number[]][],index:number):boolean => {
     let response = false;
     palindromes.forEach((p) => {
        if(p[1][0] === index) {
            response = true;
        }
     })
     return response;
  }

  const palindromeValueAtIndex = (palindromes:[string, number[]][],index:number):string => {
    let response = '';
    palindromes.forEach((p) => {
       if(p[1][0] === index) {
           response = p[0];
       }
    })
    return response;
 }
  
/**
 *
 *
 * @param {string[]} arr
 * @param {number} [index]
 * @param {any[]} [trinitarianGroups]
 * @return {*}  {any[]}
 * @description Converts a word string into a trinitarian groups array.
 * e.g: FormatTriniGroups("trinidad") => [
    [
        "t",
        "r",
        "ini",
    ],
    [
        "dad",
    ],
    ]
 */
export const FormatTriniGroups = (
    arr: string[],
    index?: number,
    trinitarianGroups?: any[]
  ): any[] => {

    const _trinitarianGroups: any[] = trinitarianGroups || [];
    if (!index) index = 0;
    // Segments Placeholder
    let triniGroup = [];
    // @deprecated assignation used before to convert the string into array
    let _arr = arr;
    const palindromes = findTrinitarianPalindromes(_arr.join(""));
    
    let localSegmentCounter = 0;
    let positionCounter = 0+index;

    while(localSegmentCounter<3) {
        if(palindromeAtIndex(palindromes,positionCounter)) {
            triniGroup.push(palindromeValueAtIndex(palindromes,positionCounter));
            localSegmentCounter++;
            positionCounter += 3;
        } else if(_arr[positionCounter]) {
            triniGroup.push(_arr[positionCounter]);
            positionCounter ++;
            localSegmentCounter++;
        } else {
            localSegmentCounter++;
        }
    }

    _trinitarianGroups.push(triniGroup);

    if(positionCounter<arr.length) {
        return FormatTriniGroups(arr,positionCounter,_trinitarianGroups);
    }

    return _trinitarianGroups

  };

  export const FormatTriniGroupsObject = (triniGroups:any[]):ITrinitarianGroup[] => {
    return triniGroups.map(tri => {

        const suj = tri[0];
        const eto = tri[1];
        const obj = tri[2];

        const word = suj ? suj : ""  + eto ? eto : "" + obj ? obj : "";
        const TriniatrianGroup:ITrinitarianGroup =
        { 
            ...suj && {suj: suj},
            ...eto && {eto: eto},
            ...obj && {obj: obj},
            word: word,
            p_idx: 0,
            c_idx: 0
        }

        return TriniatrianGroup; 
    })
  }

  export default {
    FormatTriniGroup,
    FormatTriniGroups,
    FormatTriniGroupsObject
  }