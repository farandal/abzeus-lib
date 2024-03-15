import Translator, { IABZeusTranslatorOutput } from "../src/classes/Translator";

const translator = new Translator(); // Initializes the Translator Class instance

describe("Translation test", () => {
    test("translate ABZeus", () => {
        const translation: IABZeusTranslatorOutput[] = translator.translate("ABZeus", { lang: "es" });
        expect(translation[0].splittedWord).toEqual(["ABZ","eus"]);
    });  
  });
  