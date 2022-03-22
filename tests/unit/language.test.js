const { Language, SupportedLanguages, Phrases } = require("../../compiled/model/language");

test("Assert that phrases are returned in the correct language", () => {
  for (let sl in SupportedLanguages) {
    expect(Language.shared(sl).getPhrase(Phrases.wotd)).toBe(require(`../../compiled/languages/${sl}`)[sl].wotd);

    Language.destroy();
  }
});