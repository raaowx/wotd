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
  },
  findMeanings: (html) => {
    let $ = parser.__convert(html);
    let meanings = [];
    $('.j').each((_, e) => {
      meanings.push($(e).clone().children('mark').prepend(' ').text() + ".");
    });
    return meanings;
  }
}

module.exports = parser;