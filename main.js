#!/usr/bin/env node

var downloader = require('./lib/downloader'),
    converter  = require('./lib/converter'),
    program    = require('commander');

//Basic help
program
    .version('0.1.0')
    .option('-c --console', 'Log result to console')
    .option('-o --output', 'Set output file(output.json by default)')
    .option('-v --verbose', 'Add verbose logging')
    .command('parse [website]')
    .description('Parse provided website')

    //Main function
    .action(function(website, options) {
        var response = downloader.downloadPage(website);
        var result = converter.convertToJSON(response);
        if(options.console) {
            console.log(result);
        } 
    });

// Examples
program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    html2json www.google.com');
    console.log('    html2json -o google.json www.google.com');
    console.log('');
});


program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
