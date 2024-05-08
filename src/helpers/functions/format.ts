import IABZeusTrinitarianGroup, { ITrinitarianGroup } from "../../interfaces/IABZeusTrinitarianGroup";
import doubleConsecutiveLetters from "./doubleConsecutive";
import { FormatTriniGroups } from "./formatTriniGroup";
import { findTrinitarianPalindromes, findTrinitarianPalindromesIndexes } from "./trinitarianPalindromes";



const format = (arr: any, obj?: any, index?: number): any => {

    const debug = false;

    if (!index) index = 0;
  
    let trini: any = {};
  
    let _arr = !Array.isArray(arr) ? Array.from(arr) : arr;
  
    // find palindromes, or repeated letters.
    //console.log("ARRAY",_arr)
    //console.log(`palindromes @${_arr}; ${findTrinitarianPalindromes(_arr.join(""))}`);
    //console.log(`double letters @${_arr}; ${doubleConsecutiveLetters(_arr.join(""))}`);
   
    const doubleLetters = doubleConsecutiveLetters(_arr.join(""));
    const palindromes = findTrinitarianPalindromesIndexes(_arr.join(""));
    //console.log("Palindromes",palindromes)
  
    /*while (_arr.length === 1) {
      //console.log("arrl",_arr.length);
      _arr = _arr[0];
    }*/

    trini.trini = _arr;
  
    if (_arr[index]) {
      trini.suj = _arr[index].length > 1 ? format(_arr[index]) : _arr[index];
      if(doubleLetters && doubleLetters.length && doubleLetters.includes(index) ) {
          trini.suj = _arr[index].length > 1 ? format(_arr[index]) : _arr[index]+_arr[index+1];
          index+=1
      }
      if(palindromes  && palindromes.length  && palindromes.includes(index)) {        
          trini.suj = _arr[index].length > 1 ? format(_arr[index]) : _arr[index]+_arr[index+1]+_arr[index+2];
          index+=2
      }
    }
  
    if (_arr[index + 1]) {
      trini.eto = _arr[index + 1].length > 1 ? format(_arr[index + 1]) : _arr[index + 1];
        if(doubleLetters && doubleLetters.length && doubleLetters.includes(index+1) ) {
          trini.eto = _arr[index+1].length > 1 ? format(_arr[index+1]) : _arr[index+1]+_arr[index+2];
          index+=1
        }
        if(palindromes && palindromes.length && palindromes.includes(index+1) ) {
          trini.eto = _arr[index+1].length > 1 ? format(_arr[index+1]) : _arr[index+1]+_arr[index+2]+_arr[index+3];
          index+=2
        }
  
    }
  
    if (_arr[index + 2]) {
      trini.obj =
        _arr[index + 2].length > 1 ? format(_arr[index + 2]) : _arr[index + 2];
        if(doubleLetters && doubleLetters.length && doubleLetters.includes(index+2) ) {
          trini.obj = _arr[index+2].length > 1 ? format(_arr[index+2]) : _arr[index+2]+_arr[index+3]+_arr[index+4];
          index+=1
        }
        if(palindromes && palindromes.length && palindromes.includes(index+2) ) {
          trini.obj = _arr[index+2].length > 1 ? format(_arr[index+2]) : _arr[index+2]+_arr[index+3]+_arr[index+4];
          index+=2
        }
    }

    //console.log("TRINI____",trini);
    
    if (!obj) {
      obj = trini;
    } else if (obj && obj.value && obj.value !== trini.value) {
      obj = { ...obj, trini };
    }
  
    index += 2;
    if (index < arr.length) {
      return format(arr, obj, index);
    } else {
      debug && console.log("_FORMAT", JSON.stringify(obj));
      return obj;
    }
  };

  const indexToEto = (num:number): "suj" | "eto" | "obj" => {

    const idx = num % 3;

    if(idx===0) { return "suj" }
    if(idx===1) { return "eto" }
    if(idx===2) { return "obj" }

    return "suj"
  
  }

  export const format2 = (triniObj: IABZeusTrinitarianGroup[], charReader?: number,etoIndex?:number,parentIndex?:number): any => {
  
    const debug = false;

    if (!charReader) charReader = 0;
    if (!etoIndex) etoIndex = 0;
    if (!parentIndex) parentIndex = 0;
    
    let currentTrini: IABZeusTrinitarianGroup = triniObj[parentIndex];
    let currentTriniEto = currentTrini[indexToEto(etoIndex)]
    let strArr = currentTriniEto ? Array.from(currentTriniEto) : []
   
    /*try {
    //currentETOGroup = currentTrini[indexToEto(charReader)];
    console.log("currentETOGroup",currentTriniEto,charReader,etoIndex)
    strArr = Array.from(currentTriniEto);
    console.log("currentETOGroupStringArray",strArr)
    } catch(e) {
        // TODO: Review, if this fails it is because the eto,suj,obj from the group is undefined. then the flow is broken. 
        return triniObj
    }*/

    const doubleLetters = currentTriniEto ? doubleConsecutiveLetters(currentTriniEto.toString()) : [];
    const palindromes = currentTriniEto ? findTrinitarianPalindromesIndexes(currentTriniEto.toString()) : [];
    
    //console.log("Palindromes",palindromes)
    //console.log("Double",doubleLetters)
  
    let children: IABZeusTrinitarianGroup = {
        word: strArr.join(""),
        suj: '',
        eto: '',
        obj: '',
        p_idx: 0,
        c_idx: 0
    };
    
    if (strArr[charReader]) {
        //console.log("suj index",charReader)
      if(doubleLetters && doubleLetters.length && doubleLetters.includes(charReader) ) {
          //console.log(`suj, double letter found on index ${charReader}`)
          children.suj = [strArr[charReader],strArr[charReader+1]];
          charReader+=2
          //console.log("D", children.suj)
      } else if (palindromes  && palindromes.length  && palindromes.includes(charReader)) {  
        //console.log(`suj, palindrome found on index ${charReader}`)      
          children.suj = [strArr[charReader],strArr[charReader+1],strArr[charReader+2]
          ];
          charReader+=3
          //console.log("P", children.suj)
      } else {
        //console.log(`suj, normal letter found ${charReader}`)   
        children.suj = [strArr[charReader]]
        charReader++
      }
    }
  
    if (strArr[charReader]) {
         //console.log("eto index",charReader,strArr[charReader])
        if(doubleLetters && doubleLetters.length && doubleLetters.includes(charReader) ) {
          //console.log(`eto, double letter found on index ${charReader}`)
          children.eto = [strArr[charReader],strArr[charReader+1]]
          charReader+=2
        } else if(palindromes && palindromes.length && palindromes.includes(charReader) ) {
          //console.log(`eto, palindrome found on index ${charReader}`)
          children.eto = [strArr[charReader],strArr[charReader+1],strArr[charReader+2]]
          charReader+=3
        } else {
            //console.log(`eto, normal letter found on index ${charReader}`)
            children.eto = [strArr[charReader]]
            charReader++  
        }
    }
  
    if (strArr[charReader]) {
        //console.log("obj index",charReader)
        if(doubleLetters && doubleLetters.length && doubleLetters.includes(charReader) ) {
          //console.log(`obj, double letter found on index ${charReader}`)
         children.obj = [strArr[charReader],strArr[charReader+1]];
         charReader+=2
        } else if(palindromes && palindromes.length && palindromes.includes(charReader) ) {
            //console.log(`obj, palindrome found on index ${charReader}`)
            children.obj = [strArr[charReader],strArr[charReader+1],strArr[charReader+2]]
            charReader+=3
        } else {
            //console.log(`obj, normal letter found on index ${charReader}, ${strArr[charReader]}`)
            children.obj = [strArr[charReader]]
            charReader++
        }

    }

    if (currentTrini && currentTrini.children) {
        currentTrini.children = [...currentTrini.children as IABZeusTrinitarianGroup[] , children];
    } else {
        currentTrini.children = [children];  
    }

    //console.log("OBJ",obj);
    
    if (charReader <= strArr.length && etoIndex <= 3) { // always will be eto,obj,suj, therefore 3.
        if(charReader === strArr.length) { etoIndex++; charReader=0; }
        // parentIndex++ when...
        //console.log(`index [${charReader}] <= [${strArr.length}] arr.length`)
        //console.log("FORMAT2",{suj:obj.suj,eto:obj.eto,obj:obj.obj},obj,index)
        //console.log("-----FORMAT",parentIndex,triniObj)

        if(etoIndex<3) {
            return format2(triniObj,charReader,etoIndex,parentIndex);
        }
    }  

    return triniObj;
    
  };


  export default format;