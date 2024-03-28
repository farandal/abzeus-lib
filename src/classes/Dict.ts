export interface IABZeusDictEntry {
    letter: string,
    char: string
    translation: string
}

class Dict {

    private static instance: Dict;
    private dictionaries: Map<string, Map<string, IABZeusDictEntry>>;
  
    public static getInstance(): Dict {
        if (!Dict.instance) {
            Dict.instance = new Dict();
        }
        return Dict.instance;
    }

    constructor() {
        this.dictionaries = new Map<string, Map<string, IABZeusDictEntry>>();
    }
  
    public l(l: string): void {
      if (!this.dictionaries.has(l)) {
        this.dictionaries.set(l, new Map<string, IABZeusDictEntry>());
      }
    }
  
    public c(c: string, l: string, t: string,char?: string): void {
      const languageDictionary = this.dictionaries.get(l);
      if (languageDictionary) {
        languageDictionary.set(c, {letter: c, translation: t, char: char || c});
      }
    }
  
    public t(c: string, l: string,d?:boolean): string | undefined {
 
      const languageDictionary = this.dictionaries.get(l);
      if (languageDictionary) {
        return languageDictionary.get(c)?.translation+`${d ? ` [${c}] ` : ''}`;
      }
      return "";
    }

    public getEntry(c: string, l: string): IABZeusDictEntry {
        
        let entry:IABZeusDictEntry = {letter: c, translation: '-', char: c};
        try {
            const languageDictionary = this.dictionaries.get(l);
            if(languageDictionary !== undefined && languageDictionary.get(c) !== undefined) {
                entry = languageDictionary.get(c) as IABZeusDictEntry;
            } 
            return entry
        } catch(e) {
            return entry
        }
        
      }

    public d = () => {
        return this.dictionaries;
    }
  
    public getLangs(): string[] {
      return Array.from(this.dictionaries.keys());
    }

    public alfwet = (lang:string) => {
        return this.dictionaries.get(lang);
    }

  }
  

  export default Dict;