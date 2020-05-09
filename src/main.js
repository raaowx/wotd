#!/usr/bin/env node
"use strict"
const parser = require('./parser');
const dle = require('./requestor');
const clr = { black:"\x1b[30m", blink:"\x1b[5m", blue:"\x1b[34m", bright:"\x1b[1m", cyan:"\x1b[36m", dim:"\x1b[2m", green:"\x1b[32m", hidden:"\x1b[8m", magenta:"\x1b[35m", red:"\x1b[31m", reset:"\x1b[0m", reverse:"\x1b[7m", underscore:"\x1b[4m", white:"\x1b[37m", yellow:"\x1b[33m" };

async function __crawlDelay(s) {
  const ms = 1000 * s;
  return new Promise((resolve) => { 
    setTimeout(resolve(), ms); 
  });
}

function __print(staticT, dynamicT, CR) {
  if (CR) {
    console.log();
  }
  console.log(clr.dim + clr.white + staticT + clr.reset + clr.white + dynamicT);
}

async function main() {
  try {
    let wotd = {};
    
    let result = await dle.getWordOfTheDay();
    let obj = parser.findWordOfTheDay(result.html);
    wotd['name'] = obj.name;
    wotd['path'] = obj.path;

    await __crawlDelay(5);

    result = await dle.getMeanings(wotd.path);
    wotd['meanings'] = parser.findMeanings(result.html);

    __print("Today's word is: ", wotd.name.substring(0, 1).toLocaleUpperCase() + wotd.name.substring(1));
    wotd.meanings.forEach((m, i) => {
      __print(((i < 10) ? " " + (i + 1) : i) + ".-", m);
    });
    __print("You can find more information in: ", dle.__uri + wotd.path, true);
  } catch (error) {
    console.log(clr.bright + clr.red + "Exception catched with error message: " + clr.reset + error);
  }
}

main();