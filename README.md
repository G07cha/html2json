[![Build Status](https://travis-ci.org/G07cha/html2json.svg?branch=master)](https://travis-ci.org/G07cha/html2json)
[![Code Climate](https://codeclimate.com/github/G07cha/html2json/badges/gpa.svg)](https://codeclimate.com/github/G07cha/html2json)

Simple javascript tool that convert html page to JSON string that can be used as object in future

##Usage
Just provide parse with link to website and arguments if needed. By default will parse and save result to 'output.json' file
```bash
❯ html2json

  Usage: html2json [options]

  Parse provided website

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -o --output [filename]  Set output file(output.json by default)
    -v --verbose            Add verbose logging
    -q --quiet              Do not display output to console

  Examples:

    html2json https://google.com   #parse and display output 
    html2json -o google.json https://google.com    #parse and save output to google.json
```
