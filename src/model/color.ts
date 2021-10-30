/** Colors and string modification.
 * _Available colors:_
 * - Black
 * - Blue
 * - Cyan
 * - Green
 * - Magenta
 * - Red
 * - White
 * - Yellow
 *
 * _Available modifiers:_
 * - Blink
 * - Bright
 * - Dim
 * - Hidden
 * - Reset
 * - Reverse
 * - Underscore
 */
export enum Color {
  black = "\x1b[30m",
  blue = "\x1b[34m",
  cyan = "\x1b[36m",
  green = "\x1b[32m",
  magenta = "\x1b[35m",
  red = "\x1b[31m",
  white = "\x1b[37m",
  yellow = "\x1b[33m",
  blink = "\x1b[5m",
  bright = "\x1b[1m",
  dim = "\x1b[2m",
  hidden = "\x1b[8m",
  reset = "\x1b[0m",
  reverse = "\x1b[7m",
  underscore = "\x1b[4m",
}
