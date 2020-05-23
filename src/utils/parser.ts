import cheerio = require('cheerio');

export class Parser {
  private static convert(html:string) {
    return cheerio.load(html);
  }

  static findWordOfTheDay(html:string) {
    let $ = this.convert(html);
    return {
      name: $('#wotd a').clone().children().remove().end().text(),
      path: $('#wotd a').attr('href')?.split('?')[0]
    }
  }

  static findMeanings(html:string) {
    let $ = this.convert(html);
    let meanings:string[] = [];
    $('.j').each((_, e) => {
      let m = $(e).clone();
      m.children().remove('.n_acep');
      m.children().remove('abbr');
      meanings.push(m.text());
    });
    return meanings;
  }
}