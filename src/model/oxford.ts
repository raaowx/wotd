import { Dictionary } from "./dictionary";
import { Parser, Cherioer } from "../utils/cherioer";
import { WOTD } from "./wotd"; 
/** Class containing the information about the [Oxford](https://www.oxfordlearnersdictionaries.com) online dictionary */
export class Oxford implements Dictionary, Parser {
  readonly url: string = "https://www.oxfordlearnersdictionaries.com"
  /**
   * Finds the word of the day in the HTML web page.
   * @param html String containing the HTML web page.
   * @returns WOTD object containing the word of the day. Can return `null`.
   */
  findWOTD(html: string): WOTD | null {
    let $ = Cherioer.convert(html);
    let name = $('.headword div')?.text();
    let url = $('.headword')?.attr('href');
        
    if (name && url) {
      return new WOTD(name, url);
    }
    return null;
  }
  /**
   * Find the meanings of the word of the day in the HTML web page.
   * @param html String containing the HTML web page.
   * @returns Array containing the meanings.
   */
  findMeanings(html: string): string[] {
    let $ = Cherioer.convert(html);
    let meanings: string[] = [];
    $('.entry > ol > li .def').each((_, e) => {
      let m = $(e).clone();
      meanings.push(m.text());
    });
    return meanings;
  }
}