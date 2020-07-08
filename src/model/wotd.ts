/** Class for the word of the day object. */
export class WOTD {
  private name: string;
  private url: string;
  private meanings?: string[];
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
   * @returns The path in the RAE website for the word.
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
   * @param meanigns String array containing the meanings of the word.
   */
  setMeanings(meanigns: string[]): void {
    this.meanings = meanigns;
  }
/**
 * Format every meaning capitalising the first character of the phrase and appending a dot to the end. After that sets the property.
 * @param meanigns String array containing the meanings of the word.
 */
  setMeaningsFormatted(meanigns: string[]): void {
    meanigns.forEach((m, i, arr) => {
      let str = m.substring(0, 1).toLocaleUpperCase() + m.substring(1);
      if (!str.endsWith('.')) {
        str = str + '.';
      }
      arr[i] = str;
    });
    this.meanings = meanigns;
  }
}