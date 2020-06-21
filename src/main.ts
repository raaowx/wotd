import { RAE } from './model/rae';
import { WOTD } from './model/wotd';
import { Crawler } from './utils/crawler';
import { Parser } from './utils/parser';
import { Printer } from './utils/printer'
import { Requestor } from './communications/requestor';
import { Language, Phrases } from './model/language';

(async () => {
  try {
    let language = Language.getInstance();
    let result = await Requestor.get(RAE.url);
    let wotd:WOTD|null;
    if (result.success) {
      wotd = Parser.findWordOfTheDay(result.html);
      if (!wotd) {
        throw new Error("WOTD can't be created.");
      }
    } else {
      throw new Error(result.error);
    }
    Printer.info(language.getPhrase(Phrases.wotd), wotd.getName());
    await Crawler.delay();
    result = await Requestor.get(RAE.getUrlFor(wotd.getPath()));
    if (result.success) {
      wotd.setMeanings(Parser.findMeanings(result.html));
    } else {
      throw new Error(result.error)
    }
    wotd.getMeanings()?.forEach((m, i) => {
      Printer.info(((i < 10) ? " " + (i + 1) : i) + ".-", m);
    });
    Printer.info(language.getPhrase(Phrases.info), RAE.getUrlFor(wotd.getPath()), true);
  } catch (error) {
    Printer.error(error);
  }
})();