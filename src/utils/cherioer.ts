const cheerio = require("cheerio");
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
