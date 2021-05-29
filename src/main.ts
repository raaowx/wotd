import { RAE } from './model/rae';
import { WOTD } from './model/wotd';
import { Crawler } from './utils/crawler';
import { Printer } from './utils/printer'
import { Requestor } from './communications/requestor';
import { Language, Phrases, SupportedLanguages } from './model/language';
import { Oxford } from './model/oxford';
import { CLA } from './utils/cla';

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
    switch (language.getLanguage()) {
    case SupportedLanguages.es:
      wotd = await fetchEs(cla.getCrawlerTimeout());
      break;
    case SupportedLanguages.en:
      wotd = await fetchEn(cla.getCrawlerTimeout());
      break;
    case SupportedLanguages.fr: break;
    case SupportedLanguages.de: break;
    case SupportedLanguages.de: break;
    case SupportedLanguages.pt: break;
    default: wotd = await fetchEs(cla.getCrawlerTimeout()); break;
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
      Printer.error(error);
    }
  }
})();