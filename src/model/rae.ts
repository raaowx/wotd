export class RAE {
  static readonly url: string = "https://dle.rae.es";
   
  static getUrlFor(path: string) {
    return this.url + path;
  }
}