import Translator, { IABZeusTranslatorOutput } from "./src/classes/Translator";
import formatPhraseStructure from "./src/helpers/functions/phrase";
import {removeConnectors} from "./src/helpers/functions/connectors";
const translator = new Translator(); // Initializes the Translator Class instance

//const phrase =  "el cielo estrellado es dirección al olimpo desde el pensamiento"
const phrase = "El árbol que cae en el bosque sin ser escuchado"
//const translation: IABZeusTranslatorOutput[] = translator.translate(phrase, { lang: "es",nestedTranslation:false });
//console.log(translation[0].nodeTree)
/*const translation2: IABZeusTranslatorOutput[] = translator.translate(phrase[1], { lang: "en" });
console.log(translation2[0].detailedOutput)*/
console.log(removeConnectors(phrase));

let output = formatPhraseStructure(removeConnectors(phrase));

console.log(output);