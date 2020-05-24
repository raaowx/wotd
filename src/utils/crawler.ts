export class Crawler {
  static async delay(s?:number) {
    const sec = (s) ? s : 3;    
    return new Promise((resolve) => {
      setTimeout(resolve, sec * 1000);
    });
  }
}