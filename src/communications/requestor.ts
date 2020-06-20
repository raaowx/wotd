import rp = require('request-promise');

/** Class for handle communications with the [DLE](https://dle.rae.es).*/
export class Requestor {
  /**
   * Perform a `GET` request to the given URL.
   * @param url URL to request.
   * @returns Promise that will resolve with an object containing: 
   * - `success`: Status of the request
   * - `html`: Downloaded HTML. Can be an empty string.
   * - `error`: The error ocurred. Can be an empty string.
   */
  static async get(url:string): Promise<{success: boolean, html: string, error: string}> {
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
}
