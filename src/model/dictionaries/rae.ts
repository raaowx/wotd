const { WOTD } = require("../wotd.js");
const { Cherioer } = require("../../utils/cherioer.js");
const { Dictionary } = require("../../interfaces/dictionary.js");
const { Fetcher } = require("../../interfaces/fetcher.js");
const { Parser } = require("../../interfaces/parser.js");
const { Requestor } = require("../../communications/requestor.js");
const { Crawler } = require("../../utils/crawler.js");
/** Class containing the information about the [RAE](https://rae.es) online dictionary. */
export class RAE implements InstanceType<typeof Dictionary>, InstanceType<typeof Fetcher>, InstanceType<typeof Parser> {
  readonly url: string = "https://dle.rae.es";
  /**
   * Fetch the word of the day from the dictionary.
   * @param crawler Number of seconds to wait between requests.
   * @returns WOTD object containing final result.
   */
  async fetch(crawler?: number): Promise<typeof WOTD | null> {
    try {
      let result = await Requestor.getHtml(this.url);
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
      result = await Requestor.getHtml(wotd.getUrl());
      if (result.success) {
        wotd.setMeaningsFormatted(this.findMeanings(result.html));
      } else {
        throw new Error(result.error);
      }
      return wotd;
    } catch (error) {
      throw error;
    }
  }
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
  findWOTD(html: string): typeof WOTD | null {
    let $ = Cherioer.convert(html);
    let name = $("#wotd a")?.clone().children().remove().end().text();
    let path = $("#wotd a")?.attr("href")?.split("?")[0];
    if (name && path) {
      return new WOTD(name, this.getUrlFor(path));
    }
    return null;
  }
  /**
   * Finds the meanings of the word of the day in the HTML web page.
   * @param html String containing the HTML web page.
   * @returns Array containing the meanings.
   */
  findMeanings(html: string): string[] {
    let $ = Cherioer.convert(html);
    let meanings: string[] = [];
    $(".j").each((_: any, e: string) => {
      let m = $(e).clone();
      m.children().remove(".n_acep");
      m.children().remove("abbr");
      meanings.push(m.text());
    });
    return meanings;
  }
}
