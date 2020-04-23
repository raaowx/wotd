#!/usr/bin/env node
"use strict"
const cheerio = require('cheerio');
const request = require('request-promise');

const uri = "https://dle.rae.es";
const opt = {
  uri: uri,
  transform: (body) => {
    return cheerio.load(body);
  }
}

request(opt)
  .then((html) => {
    let wotd = html('#wotd > a').text();
    let link = html('#wotd > a').attr('href');
  })
  .catch((error) => {
    console.log(error);
  });
