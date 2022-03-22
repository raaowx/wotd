const { WOTD } = require("../wotd.js");
const { Cherioer } = require("../../utils/cherioer.js");
const { Dictionary } = require("../../interfaces/dictionary.js");
const { Fetcher } = require("../../interfaces/fetcher.js");
const { Parser } = require("../../interfaces/parser.js");
const { Requestor } = require("../../communications/requestor.js");
const { Crawler } = require("../../utils/crawler.js");
/** Class containing the information about the [Duden](https://www.duden.de/) online dictionary */
export class Duden implements InstanceType<typeof Dictionary>, InstanceType<typeof Fetcher>, InstanceType<typeof Parser> {
  readonly url: string = "https://www.duden.de";
  /**
   * Fetch the word of the day from the dictionary.
   * @param crawler Number of seconds to wait between requests.
   * @return WOTD object containing final result.
   */
  async fetch(crawler?: number): Promise<typeof WOTD | null> {
    try {
      let result = await Requestor.get(this.url);
      let wotd: typeof WOTD | null;
      if (result.success) {
        wotd = this.findWOTD(result.html);
        if (!wotd) {
          throw new Error(WOTD.CREATION_ERROR);
        }
      } else {
        throw new Error(result.error);
      }
      await Crawler.delay(crawler);
      result = await Requestor.get(wotd.getUrl());
      if (result.success) {
        wotd.setMeaningsFormatted(this.findMeanings(result.html));
      } else {
        throw new Error(WOTD.CREATION_ERROR);
      }
      return wotd;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Finds the word of the day in the HTML web page.
   * @param html String containing the HTML web page.
   * @returns WOTD object containing the word of the day. Can return `null`.
   */
  findWOTD(html: string): typeof WOTD | null {
    let $ = Cherioer.convert(html);
    let name = $("#block-wordoftheday section header h2 a")?.text();
    /**
     * ! NOTE: For some unknown reason the downloaded HTML contains the WOTD with soft hyphens.
     * ! We have to remove them in order to get a clean word.
     */
    let updatedName = name.replace(/\u00AD/g, "");
    let url =
      this.url + $("#block-wordoftheday section header h2 a")?.attr("href");
    if (updatedName && url) {
      return new WOTD(updatedName, url);
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
    $("#bedeutungen ol li div").each((_: any, e: string) => {
      let m = $(e).clone();
      meanings.push(m.text());
    });
    return meanings;
  }
}
