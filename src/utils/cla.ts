import yargs from "yargs";
import { SupportedDictionaries } from "../model/dictionaries.js";
import { SupportedLanguages } from "../model/language.js";
/** Class for handle command line arguments */
export class CLA {
  private static instance: CLA;
  private static manual = `
WOTD is a binary that look for and downloads the word of the day from the selected dictionary.
    
Supported languages (ISO-639-1):
  * es : Spanish
  * en : English

Supported dictionaries:
  * oxford : Oxford (https://www.oxfordlearnersdictionaries.com)
  * rae    : RAE (https://dle.rae.es)

Usage: wotd [-c <seconds>] [-l <iso_code>] [-d <dictionary_name>]'
  ` as const;
  private static clargs = {
    debug: {
      description: "Error traces will be printed if any",
      type: "boolean",
      coerce: (d: boolean) => {
        return typeof d === "boolean" ? d : false;
      },
      default: false,
    },
    h: { alias: "help" },
    c: {
      alias: "crawler",
      description: "Set seconds to wait between finding wotd and it's meanings",
      type: "number",
      coerce: (c: number) => {
        return typeof c === "number" ? Math.trunc(Math.abs(c)) : undefined;
      },
      default: 3,
    },
    l: {
      alias: "language",
      description: "Set language of the output (wotd and it's meanings will be shown in the dictionary's language)",
      type: "string",
      choices: Object.keys(SupportedLanguages).map(key => SupportedLanguages[key as keyof typeof SupportedLanguages]),
      coerce: (l: string) => {
        return l && typeof l === "string" ? l.toLowerCase() : undefined;
      },
    },
    d: {
      alias: "dictionary",
      description: "Set in which dictionary the word of the day is going to be search",
      type: "string",
      choices: Object.keys(SupportedDictionaries).map(key => SupportedDictionaries[key as keyof typeof SupportedDictionaries]),
      coerce: (l: string) => {
        return l && typeof l === "string" ? l.toLowerCase() : undefined;
      },
    },
  } as const;
  private args: any;
  /**
   * Main constructor
   */
  private constructor() {
    this.args = yargs(process.argv.slice(2))
      .usage(CLA.manual)
      .options(CLA.clargs)
      .strict()
      .wrap(null)
      .locale("en").argv;
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
   * Get debug mode status
   * @returns Boolean indicating if debug mode is active
   */
  isDebugActive(): boolean {
    return this.args.debug ? (this.args.debug as boolean) : false;
  }
  /**
   * Get crawler timeout
   * @returns Time in seconds as a number
   */
  getCrawlerTimeout(): number | undefined {
    return this.args.c ? (this.args.c as number) : undefined;
  }
  /**
   * Get language
   * @returns Selected language as string
   */
  getLanguage(): string | undefined {
    return this.args.l ? String(this.args.l) : undefined;
  }
  /**
   * Get dictionary
   * @returns Selected dictionary as string
   */
  getDictionary(): string | undefined {
    return this.args.d ? String(this.args.d) : undefined;
  }
}
