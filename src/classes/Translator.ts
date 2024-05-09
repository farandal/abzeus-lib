
import ABZeusDict from "../dict/ABZeusDict";
import format, { format2 } from "../helpers/functions/format";
import { FormatTriniGroups, FormatTriniGroup, FormatTriniGroupsObject } from "../helpers/functions/formatTriniGroup";
import { group } from "../helpers/functions/misc";
import { splitIntoTrinitarianGroups } from "../helpers/functions/splitIntoTrinitarianGroups";
import { parseNodeLinks, nodeTree } from "../helpers/node";
import {
  forEachWord,
  forEachLetter,
  isPalindrome,
  joinTrinitarianGroupKeys,
} from "../helpers/text";

import trini from "../helpers/trini";

import IABZeusTranslatorConfig from "../interfaces/IABZeusTranslatorConfig";
import IABZeusTranslatorOutput from "../interfaces/IABZeusTranslatorOutput";
import IABZeusTrinitarianGroup from "../interfaces/IABZeusTrinitarianGroup";

import Dict from "./Dict";

export type TrinitarianGroups = string[];

const DEFAULT_PARENT_TRINI_FORMAT = "+<>";
const DEFAULT_CHILD_TRINI_FORMAT = "+><";

class Translator {

  private _dict;
  constructor() {
    // Initializes the -O-Z*us Alfwet dictionary.
    this._dict = ABZeusDict();
  }

  public c(c: string, l: string): string | undefined {
    const dictionaries = Dict.getInstance() as unknown as Map<
      string,
      Map<string, string>
    >;
    const languageDictionary = dictionaries.get(l);
    if (languageDictionary) {
      return languageDictionary.get(c);
    }
    return undefined;
  }

  public DEFAULT_TRANSLATOR_CONFIG = {
    lang: "es",
    parentTriniFormat: DEFAULT_PARENT_TRINI_FORMAT,
    childTriniFormat: DEFAULT_CHILD_TRINI_FORMAT,
    inlineDetail: true,
    lineBreak: false,
    processTree: true
  };

  /*public unicodeTranslate(word:string) {
  }*/

  public translate(
    phrase: string,
    config?: Partial<IABZeusTranslatorConfig>
  ): IABZeusTranslatorOutput[] {

    const _config =  {...this.DEFAULT_TRANSLATOR_CONFIG,
        ...config}

    //const d = this._dict.alfwet(_config.lang);

    const output: IABZeusTranslatorOutput[] = [];

    // Remove connectors from phrase
    const connectors = ["is", "es"];
    // Create a regular expression that matches any of the connectors
    const regex = new RegExp("\\b(" + connectors.join("|") + ")\\b", "gi");
    // Use the replace() method to remove the connectors
    phrase = phrase.replace(regex, "");

    if(_config.processTree) {
    
        let fullTriniTree:any[] = [];

        forEachWord(phrase, (word: string, index: number) => {
            const splittedWord = splitIntoTrinitarianGroups(word);
            fullTriniTree.push(format2(FormatTriniGroups(splittedWord)));
        });
        
        let fullTriniGroups:IABZeusTrinitarianGroup[] = [];
        forEachWord(phrase, (word: string, index: number) => {
            const splittedWord = splitIntoTrinitarianGroups(word);
            fullTriniGroups.push(...FormatTriniGroups(splittedWord, index));
        });

    }
    
    //console.log(fullTriniGroups,fullTriniTree);

    forEachWord(phrase, (word: string, index: number) => {
        
      //const splittedWord = splitIntoTrinitarianGroups(word);
      const splittedWord = FormatTriniGroups(word.split(""), index);
      console.log(splittedWord);
      const trinitarianGroups = FormatTriniGroupsObject(FormatTriniGroups(word.split(""), index));
      
      console.log(trinitarianGroups);

      const detailedOutput = this.trinitarian(trinitarianGroups, _config);
      const simpleOutput = this.trinitarian(trinitarianGroups, {
        ..._config,
        ...{ inlineDetail: false },
      });

      let unicodeTranslatedCharacters = "";
      forEachLetter(word, (letter: string, index: number) => {
        unicodeTranslatedCharacters += this._dict.getEntry(letter,_config.lang).char;
      });
  
      const result:IABZeusTranslatorOutput = {
        trinitarianGroups: trinitarianGroups,
        word: word,
        charTranslatedWord: unicodeTranslatedCharacters, 
        splittedWord: splittedWord,
        detailedOutput: `(${word}).* ${detailedOutput}`,
        simpleOutput: `${simpleOutput}`,
        triniTree: _config.processTree ? format2(FormatTriniGroups(splittedWord)) : null,
        nodeTree: _config.processTree ? parseNodeLinks(nodeTree(_config,trini(splittedWord))) : null,
      };

      output.push(result);

    });
    return output;
  }

  public translateTrinitarian(
    i: number,
    trinitarianString: string | string[],
    l: string,
    format: string, // <+>
    d?: boolean,
    lineBreak?: boolean,
    nestedTranslation?: boolean
  ) {
    const debug = false;
    let output = "";
    const dict = Dict.getInstance();
    const formatArray = Array.from(format);
    /*const trinitarianObject: IABZeusTrinitarianGroup = {
      suj: trinitarianString[0],
      eto: trinitarianString[1],
      obj: trinitarianString[2],
    };*/

    const trinitarianObject = FormatTriniGroup(trinitarianString, i, 0);
    //console.log(trinitarianString,"=>",trinitarianObject)

    // TODO process as a palindrome, if there are two consecutive letters
    const _translate = (tri: IABZeusTrinitarianGroup, i: number) => {

      debug && console.log("TRA", i, tri);
      // is the entire TriniGroup a palindrome?
      if (
        joinTrinitarianGroupKeys(tri).length > 1 &&
        isPalindrome(joinTrinitarianGroupKeys(tri))
      ) {
        if (
          !Array.isArray(tri.eto) &&
          !Array.isArray(tri.suj) &&
          !Array.isArray(tri.obj) &&
          tri.eto.length === 1 &&
          tri.suj.length === 1 &&
          tri.obj.length === 1
        ) {
          output += dict.t(tri.eto, l, d);
          debug && console.log("PAL", tri);
          if (i === 0 && tri.suj) {
            // This was commented
            //output += dict.t("suj|" + format, l);
          }
          if (i === 1 && tri.eto) {
            output += dict.t("eto|" + format, l);
          }
          if (i === 2 && tri.obj) {
            output += dict.t("obj|" + format, l);
          }

          output += dict.t("*.*|" + format, l);
          output += dict.t(tri.suj, l, d);
        } else {
          tri.eto &&
            _translate(FormatTriniGroup(tri.eto, tri.p_idx, tri.c_idx), i + 1);
        }
        return;
      }

      for (let li = 0; li < formatArray.length; li++) {
        const f = formatArray[li];
        //console.log(tri.p_idx,  tri.p_idx,"TRI", tri);
        const triLength = (tri.suj ? 1 : 0)+(tri.eto ? 1 : 0)+(tri.obj ? 1 : 0);
       
        if (f === "<") {
          if (tri.suj) {
            debug && console.log("SUJ", tri.p_idx + i, tri.p_idx + li, tri.suj);
            debug && console.log(li,i,triLength,tri.suj);
            if (li !== 0 && triLength > 1) {
                output += dict.t("suj|" + format, l);
              } 
            if (typeof tri.suj === "string" && tri.suj.length === 1) {
              output += dict.t(tri.suj, l, d);
            } else {
              //console.log("subtranslate", tri.suj);
              tri.suj &&
                _translate(
                  FormatTriniGroup(tri.suj, tri.p_idx, tri.p_idx),
                  i + li
                );
            }
          }
        }
        if (f === "+") {
            if (tri.eto) {
              debug && console.log("ETO", tri.p_idx + i, tri.p_idx + li, tri.eto);
              debug && console.log(li,i,triLength,tri.eto);
              if (li !== 0 && triLength > 1) {
                  output += dict.t("eto|" + format, l);
                } 
              if (typeof tri.eto === "string" && tri.eto.length === 1) {
                output += dict.t(tri.eto, l, d);
              } else {
                //console.log("subtranslate", tri.eto);
                tri.eto &&
                  _translate(
                    FormatTriniGroup(tri.eto, tri.p_idx, tri.p_idx),
                    i + li
                  );
              }
            }
          } 
        else if (f === ">") {
          if (tri.obj) {
            debug && console.log("OBJ", tri.p_idx + i, tri.p_idx + li, tri.obj);
            debug && console.log(li,i,triLength,tri.obj);
            if (li !== 0 && triLength > 1) {
              output += dict.t("obj|" + format, l);
            } 
            if (typeof tri.obj === "string" && tri.obj.length === 1) {
              output += dict.t(tri.obj, l, d);
            } else {
              //console.log(FormatTriniGroup(tri.obj));
              //console.log("subtranslate", tri.obj);
              tri.obj &&
                _translate(
                  FormatTriniGroup(tri.obj, tri.p_idx, tri.p_idx),
                  i + li
                );
            }
          }
        }
        output += " ";
      }
    };

    _translate(trinitarianObject, i);

    // TODO, add this to config object
    const showTrinitarianString = false;

    return `${d ? output + (showTrinitarianString? ` (${trinitarianString}).* ` : '') : output}${
      lineBreak ? "\n" : ""
    }`;
  }

  public trinitarian(tri: IABZeusTrinitarianGroup[], config: IABZeusTranslatorConfig) {
  
    if(!config.lang) config.lang = "es";
    
    const parentTriniFormat = config.parentTriniFormat || DEFAULT_PARENT_TRINI_FORMAT;
    const parentTriniFormatArray = Array.from(parentTriniFormat);
    const childTriniFormat = config.childTriniFormat || DEFAULT_CHILD_TRINI_FORMAT;
    
    let output = "";
    
    const dict = Dict.getInstance();
    
    tri.forEach((trinitarianGroup, index) => {
        
        for (let i = 0; i < parentTriniFormatArray.length; i++) {
            const positionFormat = parentTriniFormatArray[i];
            if (positionFormat === "+" && trinitarianGroup.eto) {
              //console.log("trieto",tri.eto)
              //Do not print the first connector
              //if (i > 0) {
              output += " "+dict.t("eto|" + parentTriniFormat, config.lang);
              //} else {
              //}
              output += this.translateTrinitarian(
                i,
                trinitarianGroup.eto,
                config.lang,
                childTriniFormat,
                config.inlineDetail,
                config.lineBreak,
                config.nestedTranslation
              );

            } else if (positionFormat === "<" && trinitarianGroup.suj) {
              //console.log("trisuj",tri.suj)
              //if (i > 1) {
              //console.log(i,tri.suj, dict.t("suj|" + parentTriniFormat, config.lang));
              output += " "+dict.t("suj|" + parentTriniFormat, config.lang);
              //} else {
              //}
              output += this.translateTrinitarian(
                i,
                trinitarianGroup.suj,
                config.lang,
                childTriniFormat,
                config.inlineDetail,
                config.lineBreak,
                config.nestedTranslation
              );

            } else if (positionFormat === ">" && trinitarianGroup.obj) {
              //console.log("triobj",tri.obj)
              //if (i > 0) {
              //console.log(i,tri.obj);
              output += " "+dict.t("obj|" + parentTriniFormat, config.lang);
              //} else {}
              output += this.translateTrinitarian(
                i,
                trinitarianGroup.obj,
                config.lang,
                childTriniFormat,
                config.inlineDetail,
                config.lineBreak,
                config.nestedTranslation
              );
            }


        }
    });

    return output.replace(/\s+/g, ' ');
        
  }

}

export default Translator;

export type { IABZeusTranslatorOutput as IABZeusTranslatorOutput };
export type { IABZeusTranslatorConfig as IABZeusTranslatorConfig };
export type { IABZeusTrinitarianGroup as IABZeusTrinitarianGroup };