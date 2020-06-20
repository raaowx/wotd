/** Class for handle how crawler behave. */
export class Crawler {
  /**
   * Sets a timer to `s` seconds, use it for wait some time between requests and be nice with servers. Follow `robots.txt` info.
   * @param s Number of seconds to delay.
   * @returns Promise that will resolve after timeout conclude.
   */
  static async delay(s?: number): Promise<unknown> {
    const sec = (s) ? s : 3;    
    return new Promise((resolve) => {
      setTimeout(resolve, sec * 1000);
    });
  }
}