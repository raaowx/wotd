import * as cheerio from 'cheerio';
import { WOTD } from "../model/wotd.js";
/** Class that handles the HTML parsing. */
export class Cherioer {
  /**
   * Convert HTML to [jQuery](https://jquery.com) object using [Cheerio](https://cheerio.js.org) lib.
   * @param html String containing the HTML web page.
   * @returns jQuery object.
   */
  static convert(html: string): cheerio.Root {
    return cheerio.load(html);
  }
}

export interface Parser {
  findWOTD(html: string): WOTD | null
  findMeanings(html: string): string[]
}