# WOTD

<img
src="./wotd.png" width="25">

WOTD is a binary that look for and downloads the word of the day from the selected dictionary.

- [WOTD](#wotd)
  - [Supported Languages](#supported-languages)
  - [Supported Dictionaries](#supported-dictionaries)
  - [Usage](#usage)
  - [Binary](#binary)
    - [Download](#download)
    - [Build](#build)
      - [Steps](#steps)
  - [Attributions](#attributions)
    - [Project Icon](#project-icon)
  - [License & Copyright](#license--copyright)

## Supported Languages

Language is automatically selected based on the OS locale.

Language|ISO-639-1
-|:-:
English|en
Español (Spanish)|es
Deutsch (German)|de
Français (French)|fr
Português (Portuguese)|pt

## Supported Dictionaries

Dictionary|CLA Code|Default
-|:-:|:-:
[Oxford](https://www.oxfordlearnersdictionaries.com)|oxford|✅
[RAE](https://dle.rae.es)|rae|❌
[Duden](https://www.duden.de)|duden|❌
[Urban](https://www.urbandictionary.com)|urban|❌

## Usage

Execute `wotd -h` to see the help message.

## Binary

### Download

Refer to [releases](https://github.com/raaowx/wotd/releases) to find the latest version.

### Build

For building a stand-alone binary we will use the Node tool pkg. I'll asume that you already have the following requisites in your system:

- [NodeJS](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org)
- [rimraf](https://github.com/isaacs/rimraf)
- [pkg](https://github.com/vercel/pkg)

#### Steps

1. Clone repository: `git clone https://github.com/raaowx/wotd`
2. Enter repository: `cd wotd`
3. Build the binary: `npm run pack`

The stand-alone binaries will be stored at `${PROJECT_ROOT}/binaries` folder.

## Attributions

### Project Icon

[Icon](https://www.flaticon.com/free-icon/profanity_1686501) made by [Freepik](https://www.flaticon.com/authors/freepik)

## License & Copyright

The script is licensed with [MIT License](LICENSE.txt).

Copyright © 2020 **Álvaro López de Diego {raaowx}** <raaowx@protonmail.com>
