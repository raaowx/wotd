/** Class for the word of the day object. */
export class WOTD {
  private name: string;
  private path: string;
  private meanings?: string[];
  /**
   * Main constructor.
   * @param name The word.
   * @param path The path in the RAE website for the word.
   */
  constructor(name: string, path: string) {
    this.name = name.substring(0, 1).toLocaleUpperCase() + name.substring(1);
    this.path = path;
  }
  /**
   * Getter.
   * @returns The word.
   */
  getName(): string {
    return this.name;
  }
  /**
   * Getter.
   * @returns The path in the RAE website for the word.
   */
  getPath(): string {
    return this.path;
  }
  /**
   * Getter.
   * @returns Array with all the meanings. Can be `undefined`.
   */
  getMeanings(): string[] | undefined {
    return this.meanings;
  }
  /**
   * Setter.
   * @param meanigns String array containing the meanings of the word.
   */
  setMeanings(meanigns: string[]): void {
    this.meanings = meanigns;
  }
}