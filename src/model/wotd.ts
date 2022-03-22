/** Class for the word of the day object. */
export class WOTD {
  private name: string;
  private url: string;
  private meanings?: string[];
  public static CREATION_ERROR: string = "WOTD can't be created.";
  /**
   * Main constructor.
   * @param name The word.
   * @param url The url where word definition can be found.
   */
  constructor(name: string, url: string) {
    this.name = name.substring(0, 1).toLocaleUpperCase() + name.substring(1);
    this.url = url;
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
   * @returns The path in the dictionary website for the word.
   */
  getUrl(): string {
    return this.url;
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
   * @param meanings String array containing the meanings of the word.
   */
  setMeanings(meanings: string[]): void {
    this.meanings = meanings;
  }
  /**
   * Format every meaning capitalising the first character of the phrase and appending a dot to the end. After that sets the property.
   * @param meanings String array containing the meanings of the word.
   */
  setMeaningsFormatted(meanings: string[]): void {
    meanings.forEach((m, i, arr) => {
      let str = m.substring(0, 1).toLocaleUpperCase() + m.substring(1);
      if (!str.endsWith(".")) {
        str = str + ".";
      }
      arr[i] = str;
    });
    this.meanings = meanings;
  }
}
