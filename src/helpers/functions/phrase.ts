/*
 given a phrase "el cielo estrellado dirección al olimpo en griego"
 format: [["el","cielo","estrallado"],["dirección","al","olimpo"],["en","griego"]]
 outputs: suj cielo dea el deb estrellado eto al dea dirección del olimpo obj griego dea en
*/

export const FormatGenericTriniGroups = (
    arr: string[],
    index?: number,
    groups?: any
  ): any[] => {

    if (!index) index = 0;
    if (!groups) groups = [];
  
    const _arr = !Array.isArray(arr) ? Array.from(arr) : arr;

    groups.push({
      suj: _arr[index] as unknown as string[],
      eto: _arr[index+1] as unknown as string[],
      obj: _arr[index+2] as unknown as string[]
    });

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