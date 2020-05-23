import rp = require('request-promise');

export class Requestor {
  static async getWordOfTheDay(url:string) {
    return rp(url)
      .then((html:string) => {
        return {
          success: true,
          html: html,
          error: ""
        }
      }).catch((error:string) => {
        return {
          success: false,
          html: "",
          error: error
        }
      });
  }
  
  static async getMeanings(url:string) {
    return rp(url)
      .then((html:string) => {
        return {
          success: true,
          html: html,
          error: ""
        }
      })
      .catch((error:string) => {
        return {
          success: false,
          html: "",
          error: error
        }
      });
  }
}
