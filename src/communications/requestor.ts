const axios = require("axios");
/** Class for handle communications with dictionaries.*/
export class Requestor {
  /**
   * Perform a `GET` request to the given URL.
   * @param url URL to request.
   * @returns Promise that will resolve with an object containing:
   * - `success`: Status of the request.
   * - `html`: Downloaded HTML. Can be an empty string.
   * - `error`: The error ocurred. Can be an empty string.
   */
  static async getHtml(url: string): Promise<{ success: boolean; html: string; error: string }> {
    try {
      const response = await axios.get(url);
      return {
        success: true,
        html: response.data,
        error: "",
      };
    } catch (error) {
      return {
        success: false,
        html: "",
        error: `${error}`,
      };
    }
  }
  /**
   * Perform a `GET` request to the given URL applying the given headers and parameters.
   * @param url URL to request.
   * @param headers Headers to use with the request.
   * @param params Parameters to use with the request.
   * @returns Promise that will resolve with an object containing:
   * - `success`: Status of the request.
   * - `json`: Downloaded JSON. Can be an empty object.
   * - `error`: The error ocurred. Can be an empty string.
   */
  static async getJson(url: string, headers: Object, params: Object): Promise<{ success: boolean; json: Object; error: string }> {
    try {
      const response = await axios.get(url, {
        headers: headers,
        params: params,
      });
      return {
        success: true,
        json: response.data,
        error: "",
      };
    } catch (error) {
      return {
        success: false,
        json: {},
        error: `${error}`,
      };
    }
  }
}
