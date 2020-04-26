"use strict"
const cheerio = require('cheerio');

let parser = {
  __convert: (html) => {
    return cheerio.load(html);
  },
  findWordOfTheDay: (html) => {
    let $ = parser.__convert(html);
    return {
      name: $('#wotd a').clone().children().remove().end().text(),
      path: $('#wotd a').attr('href').split('?')[0]
    }
  }
  // TODO: Parse meanings. Try to find how to iterate over al <p class="j"> and extract the text.
}

module.exports = parser;