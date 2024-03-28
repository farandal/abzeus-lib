
import { IABZeusDictEntry } from "./classes/Dict";
import Translator, {IABZeusTranslatorConfig, IABZeusTranslatorOutput, IABZeusTrinitarianGroup} from "./classes/Translator";
import ABZeusDict from "./dict/ABZeusDict";

/* TRINITY FORMAT GLOSSARY:
    - ETO: +
    - SUJ: <
    - OBJ: >
*/
/* E.g:
const translator = new Translator(); // Initializes the Translator Class instance
translator.translate("filosofía dualidad trinidad dios religión",{lang:"es"});
*/
export {
    Translator as ABZeusAlfwetTranslator,
    ABZeusDict
};

export type { IABZeusDictEntry as IABZeusDictEntry }
export type { IABZeusTranslatorOutput as IABZeusTranslatorOutput }
export type { IABZeusTranslatorConfig as IABZeusTranslatorConfig }
export type { IABZeusTrinitarianGroup as IABZeusTrinitarianGroup }