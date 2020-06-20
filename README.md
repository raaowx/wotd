# WOTD

<img
src="./wotd.png" width="25">

WOTD is a simple TypeScript script to download the published word of the day by RAE. It runs over NodeJS.

## RAE (Real Academia Española)

This script crawls the dictionary website published by the RAE public organism. The objective is to find the word of the day in the main webpage. After find it the script will also search for all the meanings of the word.

**Oficial web:** [DLE](https://dle.rae.es)  
**Robots:** [robots.txt](https://dle.rae.es/robots.txt)  

```plaintext
User-agent: *
Disallow:
Crawl-delay: 1
```

As the `robots` file shows, crawling the DLE is allowed with the certain conditions.

## Download binary

Refer to [releases](https://github.com/raaowx/wotd/releases) to find the last version.

## Build binary

For building a stand-alone binary we will use the Node tool Pkg. I'll asume that you already have the following requesites in your system:

* [NodeJS](https://nodejs.org)
* [TypeScript](https://www.typescriptlang.org)
* [rimraf](https://github.com/isaacs/rimraf)
* [Pkg](https://github.com/zeit/pkg)

### Steps

1. Clone repository: `git clone https://github.com/raaowx/wotd && cd wotd`
2. Build the binary: `npm run pack`

#### Build for specific OS

##### Linux

`npm run pack:linux`

##### MacOS

`npm run pack:macos`

##### Windows

`npm run pack:win`

## License

The script is licensed with MIT License.

## Project Icon

[Icon](https://www.flaticon.com/free-icon/profanity_1686501) made by [Freepik](https://www.flaticon.com/authors/freepik)

Copyright © 2020 **Álvaro López de Diego {raaowx}** <raaowx@protonmail.com>
