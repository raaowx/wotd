const { WOTD } = require("../wotd.js");
const { Cherioer } = require("../../utils/cherioer.js");
const { Dictionary } = require("../../interfaces/dictionary.js");
const { Fetcher } = require("../../interfaces/fetcher.js");
const { Parser } = require("../../interfaces/parser.js");
const { Requestor } = require("../../communications/requestor.js");
const { Crawler } = require("../../utils/crawler.js");
/** Class containing the information about the [Larousse](https://www.larousse.fr) online dictionary */
export class Larousse implements InstanceType<typeof Dictionary>, InstanceType<typeof Fetcher>, InstanceType<typeof Parser> {
  readonly url: string = "https://www.larousse.fr";
  private wotdPath: string = "/dictionnaires/francais-monolingue"
  /**
   * Fetch the word of the day from the dictionary.
   * @param crawler Number of seconds to wait between requests.
   * @returns WOTD objet containing final result.
   */
  async fetch(crawler?: number): Promise<typeof WOTD | null> {
    try {
      let url = this.getUrlFor(this.wotdPath);
      let result = await Requestor.getHtml(url);
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
    return this.url + path;
  }
  /**
   * Finds the word of the day in the HTML web page.
   * @param html String containing the HTML web page.
   * @returns WOTD objet containing the word of the day. Can return `null`.
   */
  private findWOTD(html: string): typeof WOTD | null {
    let $ = Cherioer.convert(html);
    let name = $(".zone-info .content-info .title-info")?.text();
    let path = $("#cphContent_LarousseRWDMaster_cphContent_DictionnairesMasterPage_HB_infoDIF_btSavoir a").attr("href");
    let url = this.getUrlFor(path);
    if (name && url) {
      return new WOTD(name, url);
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
    $(".DivisionDefinition").each((_: any, e: string) => {
      let m = $(e).clone();
      m.children().remove();
      meanings.push(m.text().trim());
    });
    return meanings;
  }
}