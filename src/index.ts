import Translator, { IABZeusTranslatorOutput } from "./classes/Translator";

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
    Translator as ABZeusAlfwetTranslator
};

export type { IABZeusTranslatorOutput as IABZeusTranslatorOutput };