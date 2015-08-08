[![Build Status](https://travis-ci.org/G07cha/html2json.svg?branch=master)](https://travis-ci.org/G07cha/html2json)

Simple javascript tool that convert html page to JSON string that can be used as object in future

##Usage
Just provide parse with link to website and arguments if needed. By default will parse and save result to 'output.json' file
```bash
❯ ./index.js

Usage: index [options] [command]


Commands:

parse [website]  Parse provided website

Options:

-h, --help              output usage information
-V, --version           output the version number
-c --console            Log result to console
-o --output [filename]  Set output file(output.json by default)
-v --verbose            Add verbose logging

Examples:

html2json https://google.com
html2json -o google.json https://google.com
```
