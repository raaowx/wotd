import { CLA } from './utils/cla.js';
import { Crawler } from './utils/crawler.js';
import { Printer } from './utils/printer.js'
import { Requestor } from './communications/requestor.js';
import { Language, Phrases } from './model/language.js';
import { SupportedDictionaries } from './model/dictionary.js';
import { WOTD } from './model/wotd.js';
import { RAE } from './model/dictionaries/rae.js';
import { Oxford } from './model/dictionaries/oxford.js';

async function fetchEs(crawler?: number) {
  try {
    let rae = new RAE();
    let result = await Requestor.get(rae.url);
    let wotd: WOTD | null;
    if (result.success) {
      wotd = rae.findWOTD(result.html);
      if (!wotd) {
        throw new Error("WOTD can't be created.");
      }
    } else {
      throw new Error(result.error);
    }
    await Crawler.delay(crawler);
    result = await Requestor.get(wotd.getUrl());
    if (result.success) {
      wotd.setMeaningsFormatted(rae.findMeanings(result.html));
    } else {
      throw new Error(result.error);
    }
    return wotd;
  } catch (error) {
    throw error;
  }
}

async function fetchEn(crawler?: number) {
  try {
    let oxford = new Oxford();
    let result = await Requestor.get(oxford.url);
    let wotd: WOTD | null;
    if (result.success) {
      wotd = oxford.findWOTD(result.html);
      if (!wotd) {
        throw new Error("WOTD can't be created.");
      }
    } else {
      throw new Error(result.error);
    }
    await Crawler.delay(crawler);
    result = await Requestor.get(wotd.getUrl());
    if (result.success) {
      wotd.setMeaningsFormatted(oxford.findMeanings(result.html));
    } else {
      throw new Error(result.error);
    }
    return wotd;
  } catch (error) {
    throw error;
  }
}

(async () => {
  const cla = CLA.getInstance()
  let language = Language.getInstance(cla.getLanguage());
  let wotd: WOTD|null = null;
  try {
    switch (cla.getDictionary()) {
      case SupportedDictionaries.rae:
        wotd = await fetchEs(cla.getCrawlerTimeout());
        break;
      default:
        wotd = await fetchEn(cla.getCrawlerTimeout());
        break;
    }
    if (wotd) {
      Printer.info(language.getPhrase(Phrases.wotd), wotd.getName());
      wotd.getMeanings()?.forEach((m, i) => {
        Printer.info(((i < 10) ? " " + (i + 1) : i) + ".-", m);
      });
      Printer.info(language.getPhrase(Phrases.info), wotd.getUrl(), true);
    } else {
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