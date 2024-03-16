import ITrinitarianGroup from "./IABZeusTrinitarianGroup";

interface IABZeusTranslatorOutput {
    trinitarianGroups: ITrinitarianGroup;
    detailedOutput: string;
    simpleOutput: string;
    word: string;
    splittedWord: string[];
    triniTree: any;
    nodeTree: any;
  }
  
export default IABZeusTranslatorOutput