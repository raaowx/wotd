# WOTD

<img
src="./wotd.png" width="25">

WOTD is a script to download the word of the day published by a dictionary and its meanings. Dictionary will be choose based on system locale.  

## Supported Languages

Language|Dictionary|URL|Robots
-|-|-|-
Español (Spanish)|[Real Academia Española](https://www.rae.es)|[DLE](https://dle.rae.es)|[robots.txt](https://dle.rae.es/robots.txt)  
English|[Oxford](https://global.oup.com)|[OLD](https://www.oxfordlearnersdictionaries.com)|[robots.txt](https://www.oxfordlearnersdictionaries.com/robots.txt)

## Binary

### Download

Refer to [releases](https://github.com/raaowx/wotd/releases) to find the lastest version.

### Build

For building a stand-alone binary we will use the Node tool Pkg. I'll asume that you already have the following requesites in your system:

* [NodeJS](https://nodejs.org)
* [TypeScript](https://www.typescriptlang.org)
* [rimraf](https://github.com/isaacs/rimraf)
* [Pkg](https://github.com/zeit/pkg)

#### Steps for all systems

1. Clone repository: `git clone https://github.com/raaowx/wotd && cd wotd`
2. Build the binary: `npm run pack`

#### Steps for Linux

`npm run pack:linux`

#### Steps for MacOS

`npm run pack:macos`

#### Steps for Windows

`npm run pack:win`

## License

The script is licensed with MIT License.

## Project Icon

[Icon](https://www.flaticon.com/free-icon/profanity_1686501) made by [Freepik](https://www.flaticon.com/authors/freepik)

Copyright © 2020 **Álvaro López de Diego {raaowx}** <raaowx@protonmail.com>
