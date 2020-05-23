import { resolve } from "dns";

export class Crawler {
  static async delay(sec:number) {
    return new Promise((resolve) => {
      setTimeout(resolve, sec * 1000);
    });
  }
}