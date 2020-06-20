/** Class containing the information about the [RAE](https://rae.es) and the online dictionary. */
export class RAE {
  static readonly url: string = "https://dle.rae.es";
  /**
   * Compose an URL based in input.
   * @param path Path component.
   * @returns URL as string.
   */
  static getUrlFor(path: string): string {
    return this.url + path;
  }
}