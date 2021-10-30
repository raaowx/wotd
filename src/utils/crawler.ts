/** Class for handle how crawler behave. */
export class Crawler {
  /**
   * Sets a timer to `s` seconds, use it for wait some time between requests and be nice with servers. Follow `robots.txt` info.
   * @param s Number of seconds to delay.
   * @returns Promise that will resolve after timeout conclude.
   */
  static async delay(sec?: number): Promise<unknown> {
    const s = sec ? sec : 3;
    return new Promise((resolve) => {
      setTimeout(resolve, s * 1000);
    });
  }
}
