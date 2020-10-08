import yargs from "yargs";
import { SupportedLanguages } from "../model/language";
/** Class for handle command line arguments */
export class CLA {
  private static instance: CLA;
  private args: yargs.Arguments
  /**
   * Main constructor
   */
  private constructor() {
    this.args = yargs
      .usage('WOTD is a binary that look for and downloads the word of the day from the selected dictionary. By default, the dictionary is choose based on operating system language. The language can be manually set.\n\nSupported languages (ISO-639-1):\n  * es : Spanish\n  * en : English\n\nUsage: wotd [-c <seconds>] [-l <iso_code>]')
      .wrap(100)
      .strict()
      .options({
        h: { alias: 'help' },
        v: { alias: 'version' },
        c: { alias: 'crawler', description: 'Set seconds to wait between finding wotd and it\'s meanings', type: 'number', coerce: (c) => { return (typeof c === 'number') ? Math.trunc(Math.abs(c)) : null } },
        l: { alias: 'language', description: 'Set language of the word of the day search', type: 'string', choices: [SupportedLanguages.es, SupportedLanguages.en], coerce: (l: string) => { return (typeof l === 'string') ? l.toLowerCase() : null } }
      }).argv;
  }
  /**
   * Getter of an unique instance of the class.
   * @returns CLA object
   */
  static getInstance(): CLA {
    if (!this.instance) {
      this.instance = new CLA();
    }
    return this.instance;
  }
  /**
   * Get crawler timeout
   * @returns Time in seconds as a number
   */
  getCrawlerTimeout(): number | undefined {
    return (this.args.c) ? this.args.c as number : undefined;
  }
  /**
   * Get language
   * @returns Selected language as string
   */
  getLanguage(): string | undefined {
    return (this.args.l) ? String(this.args.l) : undefined;
  }
}
