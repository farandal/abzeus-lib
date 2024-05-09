/*
 given a phrase "el cielo estrellado dirección al olimpo en griego"
 format: [["el","cielo","estrallado"],["dirección","al","olimpo"],["en","griego"]]
 outputs: suj cielo dea el deb estrellado eto al dea dirección del olimpo obj griego dea en
*/

import { FormatTriniGroups } from "./formatTriniGroup";

export const FormatGenericTriniGroups = (
    arr: string[],
    index?: number,
    groups?: any
  ): any[] => {

    if (!index) index = 0;
    if (!groups) groups = [];
  
    let _arr:string[] = !Array.isArray(arr) ? Array.from(arr) : arr;
    if(_arr.length === 1) { 
        _arr = !Array.isArray(_arr[0]) ? Array.from(_arr[0]) : _arr[0]  
        const trini = FormatTriniGroups(_arr)[0];
        groups.push({
            suj: Array.isArray(trini.suj) ? trini.suj.join("") : trini.suj,
            eto: Array.isArray(trini.eto) ? trini.eto.join("") : trini.eto,
            obj: Array.isArray(trini.obj) ? trini.obj.join("") : trini.obj,
        });
        
    } else {

    groups.push({
      suj: _arr[index] as unknown as string[],
      eto: _arr[index+1] as unknown as string[],
      obj: _arr[index+2] as unknown as string[]
    });
    
    }

    index += 3

    if(index <= arr.length) return FormatGenericTriniGroups(arr, index,groups)
    
    if(groups.length > 1) {
        return FormatGenericTriniGroups(groups, 0)
    }
    
    return groups;

  };

  

const formatPhraseStructure = (phrase: any): any => {
    console.log(phrase);
    const output = FormatGenericTriniGroups(phrase.split(" "))
    return output;
};

export default formatPhraseStructure;