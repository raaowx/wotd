import { RAE } from './model/rae';
import { WOTD } from './model/wotd';
import { Crawler } from './utils/crawler';
import { Parser } from './utils/parser';
import { Printer } from './utils/printer'
import { Requestor } from './communications/requestor';

(async () => {
  try {
    let result = await Requestor.getWordOfTheDay(RAE.url);
    let obj;
    if (result.success) {
      obj = Parser.findWordOfTheDay(result.html)
    } else {
      throw new Error(result.error);
    }
    let wotd = new WOTD(obj.name!, obj.path!);
    Printer.info("Today's word is: ", wotd.getName());
    await Crawler.delay(5);
    result = await Requestor.getMeanings(RAE.getUrlFor(wotd.getPath()));
    if (result.success) {
      wotd.setMeanings(Parser.findMeanings(result.html));
    } else {
      throw new Error(result.error)
    }
    wotd.getMeanings()?.forEach((m, i) => {
      Printer.info(((i < 10) ? " " + (i + 1) : i) + ".-", m);
    });
    Printer.info("You can find more information in: ", RAE.getUrlFor(wotd.getPath()), true);
  } catch (error) {
    Printer.error("Exception catched with error message: ");
  }
})();