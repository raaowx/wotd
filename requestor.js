"use strict"
const rp = require('request-promise');

let dle = {
  __uri: "https://dle.rae.es",
  getWordOfTheDay: async () => {
    return rp(dle.__uri)
      .then((html) => {
        return {
          success: true,
          html: html
        }
      }).catch((error) => {
        return {
          success: false,
          error: error
        }
      });
  },
  getMeanings: async (path) => {
    let uri = dle.__uri + path;
    return rp(uri)
      .then((html) => {
        return {
          success: true,
          html: html
        }
      })
      .catch((error) => {
        return {
          success: false,
          error: error
        }
      });
  }
}

module.exports = dle;
