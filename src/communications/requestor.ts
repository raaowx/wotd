import axios from 'axios';

/** Class for handle communications with dictionaries.*/
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
    try {
      const response = await axios.get(url);
      return {
        success: true,
        html: response.data,
        error: "",
      }
    } catch (error) {
      return {
        success: false,
        html: "",
        error: `${error}`,
      }
    }
  }
}
