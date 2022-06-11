const { WOTD } = require("../wotd.js");
const { Cherioer } = require("../../utils/cherioer.js");
const { Dictionary } = require("../../interfaces/dictionary.js");
const { Fetcher } = require("../../interfaces/fetcher.js");
const { Parser } = require("../../interfaces/parser.js");
const { Requestor } = require("../../communications/requestor.js");
const { Crawler } = require("../../utils/crawler.js");
/** Class containing the information about the [Priberam](https://dicionario.priberam.org) online dictionary */
export class Priberam implements InstanceType<typeof Dictionary>, InstanceType<typeof Fetcher>, InstanceType<typeof Parser> {
  readonly url: string = "https://dicionario.priberam.org";
  /**
   * Fetch the word of the day from the dictionary.
   * @param crawler Number of seconds to wait between requests.
   * @returns WOTD objet containing final result.
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
        throw new Error(result.success);
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
    return this.url + "/" + path;
  }
  /**
   * Finds the word of the day in the HTML web page.
   * @param html String containing the HTML web page.
   * @returns WOTD objet containing the word of the day. Can return `null`.
   */
  private findWOTD(html: string): typeof WOTD | null {
    let $ = Cherioer.convert(html);
    let name = $(".verbeteh1 h2 .varpt span b:first")?.text();
    /**
     * ! NOTE: The dictionary put some middle dots to the word.
     * ! We have to remove them in order to get a clean word.
     */
    let updatedName = name.replace(/\u00B7/g, "");
    let url = this.getUrlFor(updatedName);
    if (updatedName && url) {
      return new WOTD(updatedName, url);
    }
    return null;
  }
  /**
   * Finds the meanings of the word of the day in the HTML web page.
   * @param html String containing the HTML web page.
   * @returns Array containing the meanings.
   */
  private findMeanings(html: string): string[] {
    let $ = Cherioer.convert(html);
    let meanings: string[] = [];
    $(".verbeteh1:first").parent().children("p").each((_: any, e: string) => {
      let m = $(e).clone();
      m.children().remove("span:first");
      m.children().remove(".varpt");
      m.children().remove(".varpb");
      meanings.push(m.text());
    });
    return meanings;
  }
}