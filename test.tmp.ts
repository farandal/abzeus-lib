import Translator, { IABZeusTranslatorOutput } from "./src/classes/Translator";
const translator = new Translator(); // Initializes the Translator Class instance

const phrase = [
    "estrellado",
    "olimpus"
]

const translation: IABZeusTranslatorOutput[] = translator.translate(phrase[0], { lang: "es",nestedTranslation:false });
//console.log(translation[0].nodeTree)
/*const translation2: IABZeusTranslatorOutput[] = translator.translate(phrase[1], { lang: "en" });
console.log(translation2[0].detailedOutput)*/
