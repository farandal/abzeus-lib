
import createABZeusDict from "../dict/createABZeusDict";
import {
  forEachWord,
  isPalindrome,
  joinTrinitarianGroupKeys,
} from "../helpers/text";
import {
  FormatTriniGroup,
  FormatTriniGroups,
  format,
  group,
  splitIntoTrinitarianGroups,
  trini,
  nodeTree,
  parseNodeLinks
} from "../helpers/trini";

import IABZeusTranslatorConfig from "../interfaces/IABZeusTranslatorConfig";
import IABZeusTranslatorOutput from "../interfaces/IABZeusTranslatorOutput";
import IABZeusTrinitarianGroup from "../interfaces/IABZeusTrinitarianGroup";
import ITrinitarianGroup from "../interfaces/IABZeusTrinitarianGroup";

import Dict from "./Dict";

export type TrinitarianGroups = string[];

const DEFAULT_PARENT_TRINI_FORMAT = "+<>";
const DEFAULT_CHILD_TRINI_FORMAT = "+><";

class Translator {
  constructor() {
    // Initializes the -O-Z*us Alfwet dictionary.
    createABZeusDict();
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
  };

  public translate(
    phrase: string,
    config?: Partial<IABZeusTranslatorConfig>
  ): IABZeusTranslatorOutput[] {
    const output: IABZeusTranslatorOutput[] = [];
    forEachWord(phrase, (word: string, index: number) => {
      const splittedWord = splitIntoTrinitarianGroups(word);
      //console.log("splittedWord",splittedWord);
      const trinitarianGroups = FormatTriniGroups(splittedWord, index)[0];
      //console.log("trinitarianGroups",trinitarianGroups);

      const triniTree = format(group(trini(splittedWord)));
     
      const nodeTreeOutoput = parseNodeLinks(nodeTree({
        ...this.DEFAULT_TRANSLATOR_CONFIG,
        ...config,
      },trini(splittedWord)));

      const detailedOutput = this.trinitarian(trinitarianGroups, {
        ...this.DEFAULT_TRANSLATOR_CONFIG,
        ...config,
      });

      const simpleOutput = this.trinitarian(trinitarianGroups, {
        ...this.DEFAULT_TRANSLATOR_CONFIG,
        ...config,
        ...{ inlineDetail: false },
      });

      const result = {
        trinitarianGroups: trinitarianGroups,
        word: word,
        splittedWord: splittedWord,
        detailedOutput: `(${word}).* ${detailedOutput}`,
        simpleOutput: `(${word}).* ${simpleOutput}`,
        triniTree: triniTree,
        nodeTree: nodeTreeOutoput,
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
    /*const trinitarianObject: ITrinitarianGroup = {
      suj: trinitarianString[0],
      eto: trinitarianString[1],
      obj: trinitarianString[2],
    };*/

    const trinitarianObject = FormatTriniGroup(trinitarianString, i, 0);
    //console.log(trinitarianString,"=>",trinitarianObject)

    // TODO process as a palindrome, if there are two consecutive letters
    const _translate = (tri: ITrinitarianGroup, i: number) => {
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

    return `${d ? output + ` (${trinitarianString}).* ` : output}${
      lineBreak ? "\n" : ""
    }`;
  }

  public trinitarian(tri: ITrinitarianGroup, config: IABZeusTranslatorConfig) {
    //console.log("trinitarian()",tri);
    const parentTriniFormat =
      config.parentTriniFormat || DEFAULT_PARENT_TRINI_FORMAT;
    const parentTriniFormatArray = Array.from(parentTriniFormat);
    const childTriniFormat =
      config.childTriniFormat || DEFAULT_CHILD_TRINI_FORMAT;
    let output = "";
    const dict = Dict.getInstance();
    for (let i = 0; i < parentTriniFormatArray.length; i++) {
      const positionFormat = parentTriniFormatArray[i];
      if (positionFormat === "+" && tri.eto) {
        //console.log("trieto",tri.eto)
        //Do not print the first connector
        //if (i > 0) {
        output += dict.t("eto|" + parentTriniFormat, config.lang);
        //} else {
        //}
        output += this.translateTrinitarian(
          i,
          tri.eto,
          config.lang,
          childTriniFormat,
          config.inlineDetail,
          config.lineBreak,
          config.nestedTranslation
        );
      } else if (positionFormat === "<" && tri.suj) {
        //console.log("trisuj",tri.suj)
        //if (i > 1) {
        //console.log(i,tri.suj, dict.t("suj|" + parentTriniFormat, config.lang));
        output += dict.t("suj|" + parentTriniFormat, config.lang);
        //} else {
        //}
        output += this.translateTrinitarian(
          i,
          tri.suj,
          config.lang,
          childTriniFormat,
          config.inlineDetail,
          config.lineBreak,
          config.nestedTranslation
        );
      } else if (positionFormat === ">" && tri.obj) {
        //console.log("triobj",tri.obj)
        //if (i > 0) {
        //console.log(i,tri.obj);
        output += dict.t("obj|" + parentTriniFormat, config.lang);
        //} else {}
        output += this.translateTrinitarian(
          i,
          tri.obj,
          config.lang,
          childTriniFormat,
          config.inlineDetail,
          config.lineBreak,
          config.nestedTranslation
        );
      }
      output += ` `;
    }
    return output;
  }
}

export default Translator;

export type { IABZeusTranslatorOutput as IABZeusTranslatorOutput };
export type { IABZeusTranslatorConfig as IABZeusTranslatorConfig };
export type { IABZeusTrinitarianGroup as IABZeusTrinitarianGroup };