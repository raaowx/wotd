import { Dictionary } from "./dictionary";
import { Parser, Cherioer } from "../utils/cherioer";
import { WOTD } from "./wotd";
/** Class containing the information about the [RAE](https://rae.es) online dictionary. */
export class RAE implements Dictionary, Parser {
  readonly url: string = "https://dle.rae.es";
  /**
   * Compose an URL based in input.
   * @param path Path component.
   * @returns URL as string.
   */
  private getUrlFor(path: string): string {
    return this.url + path;
  }
  /**
   * Finds the word of the day in the HTML web page.
   * @param html String containing the HTML web page.
   * @returns WOTD object containing the word of the day. Can return `null`.
   */
  findWOTD(html: string): WOTD | null {
    let $ = Cherioer.convert(html);
    let name = $('#wotd a')?.clone().children().remove().end().text();
    let path = $('#wotd a')?.attr('href')?.split('?')[0];
    if (name && path) {
      return new WOTD(name, this.getUrlFor(path));
    }
    return null
  }
  /**
   * Finds the meanings of the word of the day in the HTML web page.
   * @param html String containing the HTML web page.
   * @returns Array containing the meanings.
   */
  findMeanings(html: string): string[] {
    let $ = Cherioer.convert(html);
    let meanings: string[] = [];
    $('.j').each((_, e) => {
      let m = $(e).clone();
      m.children().remove('.n_acep');
      m.children().remove('abbr');
      meanings.push(m.text());
    });
    return meanings;
  }
}