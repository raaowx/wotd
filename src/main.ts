const { CLA } = require("./utils/cla.js");
const { GH } = require("./utils/gh.js");
const { Utils } = require("./utils/utils.js");
const { Printer } = require("./utils/printer.js");
const { Language, Phrases } = require("./model/language.js");
const { SupportedDictionaries } = require("./model/dictionaries.js");
const { WOTD } = require("./model/wotd.js");
const { RAE } = require("./model/dictionaries/rae.js");
const { Oxford } = require("./model/dictionaries/oxford.js");
const { Duden } = require("./model/dictionaries/duden.js");
const { Urban } = require("./model/dictionaries/urban.js");
const { Priberam } = require("./model/dictionaries/priberam.js");
const { Larousse } = require("./model/dictionaries/larousse.js");

(async () => {
  const cla = CLA.shared();
  const language = Language.shared(cla.getLanguage());
  const ghi = await GH.lastVersionInfo();
  if (ghi.error && cla.isDebugActive()) {
    Printer.error(ghi.error, cla.printPlain());
  } else if (!Utils.isUpdated(require("../package.json").version, ghi.version)) {
    Printer.update(`${language.getPhrase(Phrases.update)} ${ghi.url}`, cla.printPlain());
  }
  let wotd: typeof WOTD | null = null;
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
      case SupportedDictionaries.priberam:
        wotd = await new Priberam().fetch(cla.getCrawlerTimeout());
        break;
      case SupportedDictionaries.larousse:
        wotd = await new Larousse().fetch(cla.getCrawlerTimeout());
        break;
      default:
        wotd = await new Oxford().fetch(cla.getCrawlerTimeout());
        break;
    }
    if (wotd) {
      Printer.info(language.getPhrase(Phrases.wotd), wotd.getName(), false, cla.printPlain());
      wotd.getMeanings()?.forEach((m: string, i: number) => {
        Printer.info(
          (i < 10 ? " " + (i + 1) : i) + ".-",
          m,
          false,
          cla.printPlain()
        );
      });
      Printer.info(language.getPhrase(Phrases.info), wotd.getUrl(), true, cla.printPlain());
    } else {
      Printer.error(language.getPhrase(Phrases.error), cla.printPlain());
    }
  } catch (error) {
    Printer.error(language.getPhrase(Phrases.error), cla.printPlain());
    if (cla.isDebugActive()) {
      const errorStr: string = error as string;
      Printer.error(errorStr, cla.printPlain());
    }
  }
})();
