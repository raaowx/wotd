#!/usr/bin/env node
"use strict"
const cheerio = require('cheerio');
const request = require('request-promise');
const options = {
  transform: (body, response) => {
    console.log(response.statusCode);
    return cheerio.load(body);
  }
}

let dle = {
  uri: 'https://dle.rae.es',
  getWOTD: async () => {
    return request(dle.uri, options)
      .then((html) => {
        let wotd = {
          name: html('#wotd a').text(),
          path: html('#wotd a').attr('href').split('?')[0]
        }
        return wotd;
      })
      .catch((error) => {
        console.log("[ERROR] DLE getWordOfTheDay:", error);
        return { error: true };
      });
  },
  findMeanings: async (wotd) => {
    let wordUri = dle.uri + wotd.path;
    return request(wordUri, options)
      .then((html) => {
        let meanings = [];
        console.log(html.html());
        html('#resultados article .j').each((i, e) => {
          console.log($(this), "====>", i, e);
          meanings.push($(this).text());
        });
        wotd['meanings'] = meanings;
        return wotd
      })
      .catch((error) => {
        console.log("[ERROR] DLE getMeanings:", error);
        return { error: true };
      });
  }
}


function main() {
  return dle.getWOTD()
    .then(dle.findMeanings)
    .then((wotd) => {
      console.log(wotd);
    })
    .catch((error) => {
      console.log(error);
    })
}

main();