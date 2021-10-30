import { osLocaleSync } from "os-locale";
import { en } from "../languages/en.js";
import { es } from "../languages/es.js";
import { de } from "../languages/de.js";
import { fr } from "../languages/fr.js";
import { pt } from "../languages/pt.js";

/** Class for handle multi-language support. */
export class Language {
  private static instance: Language;
  private language: SupportedLanguages;
  private file: any;
  /**
   * Main constructor
   */
  private constructor(language?: string) {
    let l = language;
    if (!l) {
      l = osLocaleSync({ spawn: false }).split("-")[0];
    }
    switch (l) {
      case "es":
        this.language = SupportedLanguages.es;
        this.file = es;
        break;
      case "de":
        this.language = SupportedLanguages.de;
        this.file = de;
        break;
      case "fr":
        this.language = SupportedLanguages.fr;
        this.file = fr;
        break;
      case "pt":
        this.language = SupportedLanguages.pt;
        this.file = pt;
        break;
      default:
        this.language = SupportedLanguages.en;
        this.file = en;
        break;
    }
  }
  /**
   * Getter of an unique instance of this class.
   * @returns Lang object
   */
  static getInstance(language?: string): Language {
    if (!this.instance) {
      this.instance = new Language(language);
    }
    return this.instance;
  }
  /**
   * Get current language.
   * @returns The current language.
   */
  getLanguage(): SupportedLanguages {
    return this.language;
  }
  /**
   * Get phrase in the current language selection.
   * @param phrase Phrase we want.
   * @returns A string containing the phrase.
   */
  getPhrase(phrase: Phrases): string {
    switch (phrase) {
      case Phrases.wotd:
        return this.file.wotd;
      case Phrases.info:
        return this.file.info;
      case Phrases.error:
        return this.file.error;
      default:
        return "";
    }
  }
}

/** Supported languages for output static text:
 * - English
 * - Spanish
 * - German
 * - French
 * - Portuguese
 */
export enum SupportedLanguages {
  en = "en",
  es = "es",
  de = "de",
  fr = "fr",
  pt = "pt",
}

/** List of static phrases that the software will print. */
export enum Phrases {
  wotd,
  info,
  error,
}
