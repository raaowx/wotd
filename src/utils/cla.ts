import yargs from "yargs";
import { SupportedLanguages } from "../model/language.js";
/** Class for handle command line arguments */
export class CLA {
  private static instance: CLA;
  private static manual = `
WOTD is a binary that look for and downloads the word of the day from the selected dictionary. By default, the dictionary is choose based on operating system language. The language can be manually set.
    
Supported languages (ISO-639-1):
  * es : Spanish
  * en : English

Usage: wotd [-c <seconds>] [-l <iso_code>]'
  ` as const;
  private static clargs = {
    h: { alias: "help" },
    d: {
      alias: "debug",
      description: "Error traces will be printed if any",
      type: "boolean",
      coerce: (d: boolean) => {
        return typeof d === "boolean" ? d : false;
      },
      default: false,
    },
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
      description: "Set language of the word of the day search",
      type: "string",
      choices: [SupportedLanguages.es, SupportedLanguages.en],
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
      .locale("en")
      .argv;
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
    return this.args.d ? (this.args.d as boolean) : false;
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
}
