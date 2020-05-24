import { Color } from '../model/color';

export module Printer {
  export function info(staticT: string, dynamicT: string, CR?: boolean) {
    if (CR) {
      console.log();
    }
    console.log(Color.dim + Color.white + staticT + Color.reset + Color.white + dynamicT + Color.reset);
  }

  export function error(error: string) {
    console.log(Color.red);
    console.error(error);
    console.log(Color.reset);    
  }
}