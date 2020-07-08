import { RAE } from './model/rae';
import { WOTD } from './model/wotd';
import { Crawler } from './utils/crawler';
import { Printer } from './utils/printer'
import { Requestor } from './communications/requestor';
import { Language, Phrases, SupportedLanguages } from './model/language';
import { Oxford } from './model/oxford';

async function fetchEs() {
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
    await Crawler.delay();
    result = await Requestor.get(wotd.getUrl());
    if (result.success) {
      wotd.setMeaningsFormatted(rae.findMeanings(result.html));
    } else {
      throw new Error(result.error);
    }
    return wotd;
  } catch (error) {
    Printer.error(error);
    return null;
  }
}

async function fetchEn() {
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
    await Crawler.delay();
    result = await Requestor.get(wotd.getUrl());
    if (result.success) {
      wotd.setMeaningsFormatted(oxford.findMeanings(result.html));
    } else {
      throw new Error(result.error);
    }
    return wotd;
  } catch (error) {
    Printer.error(error);
    return null;
  }
}

(async () => {
  let language = Language.getInstance();
  let wotd: WOTD|null = null;
  switch (language.getLanguage()) {
  case SupportedLanguages.es:
    wotd = await fetchEs();
    break;
  case SupportedLanguages.en:
    wotd = await fetchEn();
    break;
  case SupportedLanguages.fr: break;
  case SupportedLanguages.de: break;
  case SupportedLanguages.de: break;
  case SupportedLanguages.pt: break;
  default: wotd = await fetchEs(); break;
  }

  if (wotd) {
    Printer.info(language.getPhrase(Phrases.wotd), wotd.getName());
    wotd.getMeanings()?.forEach((m, i) => {
      Printer.info(((i < 10) ? " " + (i + 1) : i) + ".-", m);
    });
    Printer.info(language.getPhrase(Phrases.info), wotd.getUrl(), true);
  }
})();