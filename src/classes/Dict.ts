class Dict {

    private static instance: Dict;
    private dictionaries: Map<string, Map<string, string>>;
  
    public static getInstance(): Dict {
        if (!Dict.instance) {
            Dict.instance = new Dict();
        }
        return Dict.instance;
    }

    constructor() {
        this.dictionaries = new Map<string, Map<string, string>>();
    }
  
    public l(l: string): void {
      if (!this.dictionaries.has(l)) {
        this.dictionaries.set(l, new Map<string, string>());
      }
    }
  
    public c(c: string, l: string, t: string): void {
      const languageDictionary = this.dictionaries.get(l);
      if (languageDictionary) {
        languageDictionary.set(c, t);
      }
    }
  
    public t(c: string, l: string,d?:boolean): string | undefined {
 
      const languageDictionary = this.dictionaries.get(l);
      if (languageDictionary) {
        return languageDictionary.get(c)+`${d ? ` [${c}] ` : ''}`;
      }
      return "";
    }

    public d = () => {
        return this.dictionaries;
    }
  
    public getLangs(): string[] {
      return Array.from(this.dictionaries.keys());
    }

  }
  

  export default Dict;