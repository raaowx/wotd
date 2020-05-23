export class WOTD {
  private name: string;
  private path: string;
  private meanings?: string[];

  constructor(name: string, path: string) {
    this.name = name.substring(0, 1).toLocaleUpperCase() + name.substring(1);
    this.path = path;
  }
  
  getName() {
    return this.name;
  }

  getPath() {
    return this.path;
  }

  getMeanings() {
    return this.meanings;
  }

  setMeanings(meanigns: string[]) {
    this.meanings = meanigns;
  }
}