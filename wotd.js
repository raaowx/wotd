#!/usr/bin/env node
"use strict"
const parser = require('./parser');
const dle = require('./requestor');

async function __crawlDelay(s) {
  const ms = 1000 * s;
  return new Promise((resolve) => { 
    setTimeout(resolve(), ms); 
  });
}

async function main() {
  try {
    let wotd = {};
    
    let result = await dle.getWordOfTheDay();
    let obj = parser.findWordOfTheDay(result.html);
    wotd['name'] = obj.name;
    wotd['path'] = obj.path;

    await __crawlDelay(5);

    console.log("Today's word is:", wotd.name);
    console.log("You can find it in:", dle.__uri + wotd.path);
    // TODO: Show meanings
  } catch (error) {
    console.log("Exception catched with error message:", error);
  }
}

main();