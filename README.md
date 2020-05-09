# WOTD

<img
src="./wotd.png" width="25">

WOTD is a simple NodeJS script to download the published word of the day by RAE

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

## License

The script is licensed with MIT License.

## Project Icon

[Icon](https://www.flaticon.com/free-icon/profanity_1686501) made by [Freepik](https://www.flaticon.com/authors/freepik)

Copyright © 2020 **Álvaro López de Diego {raaowx}** <raaowx@protonmail.com>
