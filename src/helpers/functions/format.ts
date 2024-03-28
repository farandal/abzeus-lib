import IABZeusTrinitarianGroup, { ITrinitarianGroup } from "../../interfaces/IABZeusTrinitarianGroup";
import doubleConsecutiveLetters from "./doubleConsecutive";
import { FormatTriniGroups } from "./formatTriniGroup";
import { findTrinitarianPalindromes, findTrinitarianPalindromesIndexes } from "./trinitarianPalindromes";

const format = (arr: any, obj?: any, index?: number): any => {

    const debug = true;

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
      debug && console.log("FORMAT", JSON.stringify(obj));
      return obj;
    }
  };

  const indexToEto = (num:Number): "suj" | "eto" | "obj" => {
    
    switch(num) {
        case 0: 
        return "suj"
        case 1: 
        return "eto"
        case 2:
        return "obj"
        default:
        return "suj"
    }

  }
  export const format2 = (triniObj: IABZeusTrinitarianGroup[], index?: number): any => {
  
    const debug = true;

    if (!index) index = 0;
    const originalIndex = index;

    let currentTrini: IABZeusTrinitarianGroup = triniObj[index];

    if(triniObj.length===1) {
        currentTrini = triniObj[0]
    } 
    
    console.log("currentTrini",currentTrini);

    //let trini: any = {};

    console.log("index",index)
    /* @ts-ignore */
    let currentETOGroup;
    let strArr;

    try {
    currentETOGroup = currentTrini[indexToEto(index)];
    console.log("currentETOGroup",currentETOGroup,index)
    strArr = Array.from(currentETOGroup);
    console.log("currentETOGroupStringArray",strArr)
    } catch(e) {
        // TODO: Review, if this fails it is because the eto,suj,obj from the group is undefined. then the flow is broken. 
        return triniObj
    }

    //console.log("JOINED ARR",strArr);

    //console.log(`palindromes @${_arr}; ${findTrinitarianPalindromes(_arr.join(""))}`);
    //console.log(`double letters @${_arr}; ${doubleConsecutiveLetters(_arr.join(""))}`);
   
    const doubleLetters = doubleConsecutiveLetters(currentETOGroup.toString());
    const palindromes = findTrinitarianPalindromesIndexes(currentETOGroup.toString());
    
    console.log("Palindromes",palindromes)
    console.log("Double",doubleLetters)
  
    /*while (_arr.length === 1) {
      //console.log("arrl",_arr.length);
      _arr = _arr[0];
    }*/

    //obj.trini = strArr;
    let children: IABZeusTrinitarianGroup = {
        word: strArr.join(""),
        suj: '',
        eto: '',
        obj: '',
        p_idx: 0,
        c_idx: 0
    };
    
    if (strArr[index]) {
        console.log("suj index",index)
      if(doubleLetters && doubleLetters.length && doubleLetters.includes(index) ) {
          console.log(`suj, double letter found on index ${index}`)
          children.suj = [strArr[index],strArr[index+1]];
          index+=2
          console.log("D", children.suj)
      } else if (palindromes  && palindromes.length  && palindromes.includes(index)) {  
        console.log(`suj, palindrome found on index ${index}`)      
          children.suj = [strArr[index],strArr[index+1],strArr[index+2]
          ];
          index+=3
          console.log("P", children.suj)
      } else {
        console.log(`suj, normal letter found ${index}`)   
      
        //children.suj = strArr[index] && strArr[index].length > 1 ? format2(FormatTriniGroups([strArr[index]])) : strArr[index];
        children.suj = [strArr[index]]
        
        index++
      }

      //console.log("SUJ", obj.trini.suj )
     
    }
  
    if (strArr[index]) {
         console.log("eto index",index,strArr[index])
        if(doubleLetters && doubleLetters.length && doubleLetters.includes(index) ) {
          console.log(`eto, double letter found on index ${index}`)
          children.eto = [strArr[index],strArr[index+1]]
          index+=2
        } else if(palindromes && palindromes.length && palindromes.includes(index) ) {
          console.log(`eto, palindrome found on index ${index}`)
          children.eto = [strArr[index],strArr[index+1],strArr[index+2]]
          index+=3
        } else {
            console.log(`eto, normal letter found on index ${index}`)
            //children.eto = Array.from(strArr[index+1]).length > 1 ? format2(FormatTriniGroups([strArr[index+1]])) : strArr[index+1];  
            children.eto = [strArr[index]]
            index++  
        }

        //console.log("ETO", obj.trini.eto )
  
    }
  
    if (strArr[index]) {
        console.log("obj index",index)
        if(doubleLetters && doubleLetters.length && doubleLetters.includes(index) ) {
          console.log(`obj, double letter found on index ${index}`)
         // trini.obj = strArr[index+2].length > 1 ? format2(FormatTriniGroups([strArr[index+2]])) : strArr[index+2]+strArr[index+3]+strArr[index+4];
         children.obj = [strArr[index],strArr[index+1]];
          index+=2
        } else if(palindromes && palindromes.length && palindromes.includes(index) ) {
            console.log(`obj, palindrome found on index ${index}`)
            //trini.obj = strArr[index+2].length > 1 ? format2(strArr[index+2]) : strArr[index+2]+strArr[index+3]+strArr[index+4];
            children.obj = [strArr[index],strArr[index+1],strArr[index+2]]
          index+=3
        } else {
            console.log(`obj, normal letter found on index ${index}, ${strArr[index]}`)
            //children.obj = strArr[index].length > 1 ? format2(FormatTriniGroups([strArr[index]])) : strArr[index];
            children.obj = [strArr[index]]
            index++
         
        }
 
        //console.log("OBJ", obj.trini.obj )

    }

    //console.log(index);
    //index += readerPos;

    //console.log("TRINI____",obj.trini);
       
    /*if (!obj) {
      obj = trini;
    }
   */

   /* if (!triniObj[originalIndex].children) {
        triniObj[originalIndex].children = children;
    } else {
        triniObj[originalIndex].children  = [...triniObj[originalIndex].children,children]
    }*/
    console.log("CURRENT TRINI ONBJ",currentTrini)
    /*if (triniObj[originalIndex] && triniObj[originalIndex].children) {
       
        triniObj[originalIndex].children = [...triniObj[originalIndex].children as IABZeusTrinitarianGroup[] , children];
    } else {
        triniObj[originalIndex].children = [children];
       
    }*/

    if (currentTrini && currentTrini.children) {
        currentTrini.children = [...currentTrini.children as IABZeusTrinitarianGroup[] , children];
    } else {
        currentTrini.children = [children];  
    }

    //console.log("OBJ",obj);
    console.log(`index < arr.length`, index,strArr.length)
    
    if (index <= strArr.length) {
        //console.log("FORMAT2",{suj:obj.suj,eto:obj.eto,obj:obj.obj},obj,index)
        console.log("FORMAT",originalIndex+1,triniObj)
        return format2(triniObj,originalIndex+1);
    }  

    //debug && console.log("FORMAT", JSON.stringify(obj));
    return triniObj;
    
  };


  export default format;