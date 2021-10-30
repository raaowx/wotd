import { CLA } from "./utils/cla.js";
import { Printer } from "./utils/printer.js";
import { Language, Phrases } from "./model/language.js";
import { SupportedDictionaries } from "./model/dictionaries.js";
import { WOTD } from "./model/wotd.js";
import { RAE } from "./model/dictionaries/rae.js";
import { Oxford } from "./model/dictionaries/oxford.js";
import { Duden } from "./model/dictionaries/duden.js";
import { Urban } from "./model/dictionaries/urban.js";

(async () => {
  const cla = CLA.getInstance();
  let language = Language.getInstance(cla.getLanguage());
  let wotd: WOTD | null = null;
  try {
    switch (cla.getDictionary()) {
      case SupportedDictionaries.rae:
        wotd = await new RAE().fetch(cla.getCrawlerTimeout());
        break;
      case SupportedDictionaries.duden:
        wotd = await new Duden().fetch(cla.getCrawlerTimeout());
        break;
      case SupportedDictionaries.urban:
        wotd = await new Urban().fetch(cla.getCrawlerTimeout());
        break;
      default:
        wotd = await new Oxford().fetch(cla.getCrawlerTimeout());
        break;
    }
    if (wotd) {
      Printer.info(language.getPhrase(Phrases.wotd), wotd.getName());
      wotd.getMeanings()?.forEach((m, i) => {
        Printer.info((i < 10 ? " " + (i + 1) : i) + ".-", m);
      });
      Printer.info(language.getPhrase(Phrases.info), wotd.getUrl(), true);
    } else {
      Printer.error(language.getPhrase(Phrases.error));
    }
  } catch (error) {
    Printer.error(language.getPhrase(Phrases.error));
    if (cla.isDebugActive()) {
      const errorStr: string = error as string;
      Printer.error(errorStr);
    }
  }
})();
