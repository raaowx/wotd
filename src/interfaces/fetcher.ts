import { WOTD } from "../model/wotd.js";
/** Interface for force all dictionaries to implement find methods */
export interface Fetcher {
  fetch(crawler?: number): Promise<WOTD | null>;
}
