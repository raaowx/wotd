const { WOTD } = require("../model/wotd.js");
/** Interface for force all dictionaries to implement find methods */
export interface Parser {
  findWOTD(html: string): typeof WOTD | null;
  findMeanings(html: string): string[];
}
