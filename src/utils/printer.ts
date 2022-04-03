const { Color } = require("../model/color.js");
/** Module with functions for printing results to console. */
export module Printer {
  /**
   * For printing information.
   * @param staticT String for text that will be repeated several times. Will be printed in dimmed white.
   * @param dynamicT String for text that will change. Will be printed in white.
   * @param cr Boolean for print a carriage return before the text.
   * @param plain Boolean for print colour.
   */
  export function info(staticT: string, dynamicT: string, cr?: boolean, plain?: boolean): void {
    if (cr) {
      console.log();
    }
    let str = plain ? "" : Color.dim + Color.white;
    str += staticT;
    str += plain ? "" : Color.reset;
    str += " ";
    str += plain ? "" : Color.white;
    str += dynamicT;
    str += plain ? "" : Color.reset;
    console.log(str);
  }
  /**
   * For printing errors
   * @param error String containing the error.
   * @param plain Boolean for print colour.
   */
  export function error(error: string, plain?: boolean): void {
    console.log((plain) ? "" : Color.red);
    console.error(error);
    console.log((plain) ? "" : Color.reset);
  }
  /**
   * For printing update warning
   * @param phrase String containing the warning.
   * @param plain Boolean for print colour
   */
  export function update(phrase: string, plain?: boolean): void {
    console.log((plain) ? "" : Color.yellow);
    console.log(phrase);
    console.log((plain) ? "" : Color.reset);
    console.log();  
  }
}
