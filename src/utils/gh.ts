const { Requestor } = require("../communications/requestor.js");
/** Class with GitHub related utils */
export class GH {
  private static wotdReleasesURL: string = "https://github.com/raaowx/wotd/releases"

  private static url: string = "https://api.github.com";
  private static headers: Object = {
    accept: "application/vnd.github.v3+json",
  };
  /**
   * Get last WOTD version info.
   * This function will never throw. If anything goes wrong it will return two empty strings.
   * @returns Promise that will resolve with a tuple containing:
   * - `version`: String containing the last version number.
   * - `url`: String containing the last version download URL.
   * - `error`: String containing an error description. Can be null.
   */
  static async lastVersionInfo(): Promise<{version?: string, url?: string, error?: string}> {
    try {
      const path = "/repos/raaowx/wotd/releases";
      const params = {
        "per_page": 1,
      }
      const result = await Requestor.getJson(this.url + path, this.headers, params);
      if (!result.success) {
        return {
          error: "The retrieval of the last released version information has failed",
        };
      }
      if (!result.json[0].name) {
        return {
          error: "The retrieval of the last version name has failed",
        };
      }
      return {
        version: result.json[0].name,
        url: (result.json[0]["html_url"]) ? result.json[0]["html_url"] : this.wotdReleasesURL,
      };
    } catch (error) {
      return {
        error: `${error}`,
      }
    }
  }
}