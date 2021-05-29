import osLocale from  'os-locale';
/** Class for handle multi-language support. */
export class Language {
  private static instance: Language;
  private language: SupportedLanguages;
  private file: any;
  /**
   * Main constructor
   */
  private constructor(language?: string) {
    let l = (language) ? language : osLocale.sync({ spawn: false }).split('-')[0]
    switch (l) {
      case 'es':
        this.language = SupportedLanguages.es;
        this.file = require('../languages/es').es;
        break;
      case 'en':
        this.language = SupportedLanguages.en;
        this.file = require('../languages/en').en;
        break;
      case 'fr':
        this.language = SupportedLanguages.fr;
        this.file = require('../languages/fr').fr;
        break;
      case 'de':
        this.language = SupportedLanguages.de;
        this.file = require('../languages/de').de;
        break;
      case 'pt':
        this.language = SupportedLanguages.pt;
        this.file = require('../languages/pt').pt;
        break;
      default:
        this.language = SupportedLanguages.es;
        this.file = require('../languages/es').es;
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
  getLanguage(): SupportedLanguages {
    return this.language;
  }
  /**
   * Get phrase in the current language selection.
   * @param phrase Phrase we want.
   * @returns A string containing the phrase.
   */
  getPhrase(phrase: Phrases): string {
    switch (phrase) {
      case Phrases.wotd: return this.file.wotd;
      case Phrases.info: return this.file.info;
      case Phrases.error: return this.file.error;
      default: return "";
    }
  }
}

/** Supported languages for output static text:
 * - Spanish
 * - English
 * - French
 * - German
 * - Portuguese
*/
export enum SupportedLanguages {
  en = "en",
  fr = "fr",
  es = "es",
  de = "de",
  pt = "pt",
}

/** List of static phrases that the software will print. */
export enum Phrases {
  wotd,
  info,
  error,
}