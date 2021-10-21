/** Main interface for all dictionaries */
export interface Dictionary {
  readonly url: string
}

/** Supported dictionaries:
 * - Oxford
 * - RAE
 */
export enum SupportedDictionaries {
  oxford = "oxford",
  rae = "rae",
}