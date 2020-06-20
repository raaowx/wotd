import cheerio = require('cheerio');
import { RAE } from '../model/rae';
import { WOTD } from '../model/wotd';
/** Class that handles the HTML parsing. */
export class Parser {
  /**
   * Convert HTML to [jQuery](https://jquery.com) object using [Cheerio](https://cheerio.js.org) lib.
   * @param html String containing the HTML web page.
   * @returns jQuery object.
   */
  private static convert(html: string): CheerioStatic {
    return cheerio.load(html);
  }
  /**
   * Finds the word of the day in the HTML web page.
   * @param html String containing the HTML web page.
   * @returns WOTD object containing the word of the day. Can return `null`.
   */
  static findWordOfTheDay(html: string): WOTD | null {
    let $ = this.convert(html);
    let name = $('#wotd a')?.clone().children().remove().end().text();
    let path = $('#wotd a')?.attr('href')?.split('?')[0];
    if (name && path) {
      return new WOTD(name, path);
    }
    return null    
  }
  /**
   * Finds the meanings of the word of the day in the HTML web page.
   * @param html String containing the HTML web page.
   * @returns Array containing the meanings.
   */
  static findMeanings(html: string): string[] {
    let $ = this.convert(html);
    let meanings:string[] = [];
    $('.j').each((_, e) => {
      let m = $(e).clone();
      m.children().remove('.n_acep');
      m.children().remove('abbr');
      meanings.push(m.text());
    });    
    return meanings;
  }
}