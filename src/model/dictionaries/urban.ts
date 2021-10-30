import { WOTD } from "../wotd.js";
import { Cherioer } from "../../utils/cherioer.js";
import { Dictionary } from "../../interfaces/dictionary.js";
import { Fetcher } from "../../interfaces/fetcher.js";
import { Parser } from "../../interfaces/parser.js";
import { Requestor } from "../../communications/requestor.js";
import { Crawler } from "../../utils/crawler.js";
/** Class containing the information about the [Urban](https://www.urbandictionary.com/) online dictionary */
export class Urban implements Dictionary, Fetcher, Parser {
  readonly url: string = "https://www.urbandictionary.com";
  /**
   * Fetch the word of the day from the dictionary.
   * @param crawler Number of seconds to wait between requests.
   * @return WOTD object containing final result.
   */
  async fetch(crawler?: number): Promise<WOTD | null> {
    try {
      let result = await Requestor.get(this.url);
      let wotd: WOTD | null;
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
  findWOTD(html: string): WOTD | null {
    let $ = Cherioer.convert(html);
    let name = $(".def-panel .def-header a")?.first().text();
    let url = this.url + $(".def-panel .def-header a")?.first().attr("href");
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
    $(".meaning").each((_, e) => {
      let m = $(e).clone();
      meanings.push(m.text());
    });
    return meanings;
  }
}
