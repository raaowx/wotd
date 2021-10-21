# WOTD

<img
src="./wotd.png" width="25">

WOTD is a binary that look for and downloads the word of the day from the selected dictionary.

- [WOTD](#wotd)
  - [Supported Languages](#supported-languages)
  - [Usage](#usage)
  - [Binary](#binary)
    - [Download](#download)
    - [Build](#build)
      - [Steps for all systems](#steps-for-all-systems)
      - [Steps for Linux](#steps-for-linux)
      - [Steps for MacOS](#steps-for-macos)
      - [Steps for Windows](#steps-for-windows)
  - [Attributions](#attributions)
    - [Project Icon](#project-icon)
  - [License & Copyright](#license--copyright)

## Supported Languages

Language|ISO-639-1|Dictionary|Robots
-|:-:|-|:-:
English|en|[Oxford](https://www.oxfordlearnersdictionaries.com)|[robots.txt](https://www.oxfordlearnersdictionaries.com/robots.txt)
Español (Spanish)|es|[RAE](https://dle.rae.es)|[robots.txt](https://dle.rae.es/robots.txt)  

## Usage

Execute `wotd -h` to see the help message.

## Binary

### Download

Refer to [releases](https://github.com/raaowx/wotd/releases) to find the latest version.

### Build

For building a stand-alone binary we will use the Node tool Pkg. I'll asume that you already have the following requisites in your system:

- [NodeJS](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org)
- [rimraf](https://github.com/isaacs/rimraf)
- [Pkg](https://github.com/zeit/pkg)

#### Steps for all systems

1. Clone repository: `git clone https://github.com/raaowx/wotd && cd wotd`
2. Build the binary: `npm run pack`

#### Steps for Linux

`npm run pack:linux`

#### Steps for MacOS

`npm run pack:macos`

#### Steps for Windows

`npm run pack:win`

## Attributions

### Project Icon

[Icon](https://www.flaticon.com/free-icon/profanity_1686501) made by [Freepik](https://www.flaticon.com/authors/freepik)

## License & Copyright

The script is licensed with [MIT License](LICENSE.txt).

Copyright © 2020 **Álvaro López de Diego {raaowx}** <raaowx@protonmail.com>
