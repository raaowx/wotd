import { Color } from '../model/color';
/** Module with functions for printing results to console. */
export module Printer {
  /**
   * For printing information.
   * @param staticT String for text that will be repeated several times. Will be printed in dimmed white.
   * @param dynamicT String for text that will change. Will be printed in white.
   * @param CR Boolean for print a carriage return before the text.
   */
  export function info(staticT: string, dynamicT: string, cr?: boolean): void {
    if (cr) {
      console.log();
    }
    console.log(Color.dim + Color.white + staticT + Color.reset + " " + Color.white + dynamicT + Color.reset);
  }
  /**
   * For printing errors
   * @param error String containing the error.
   */
  export function error(error: string): void {
    console.log(Color.red);
    console.error(error);
    console.log(Color.reset);    
  }
}