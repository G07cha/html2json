#!/usr/bin/env node

var downloader = require('./lib/downloader'),
    converter  = require('./lib/converter'),
    program    = require('commander'),
    fs         = require('fs');

//Basic help
program
    .version('0.1.0')
    .option('-c --console', 'Log result to console')
    .option('-o --output [filename]', 'Set output file(output.json by default)')
    .option('-v --verbose', 'Add verbose logging')
    .command('parse [website]')
    .description('Parse provided website')

    //Main function
    .action(function(website) {
        var response = downloader.downloadPage(website);
        var result = JSON.stringify(converter.convertToJSON(response, program.verbose), null, 2);
        var filename = "output.json";
    
        if(program.console) {
            console.log(result);
            return true;
        }
        if (program.output) {
            filename = program.output;
        }
        
        fs.writeFileSync(filename, result);
    });

// Examples
program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    html2json https://google.com');
    console.log('    html2json -o google.json https://google.com');
    console.log('');
});


program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}

//Export module
module.exports = {
    convertPage: function(page) {
        var response = downloader.downloadPage(page);
        return JSON.stringify(converter.convertToJSON(response, program.verbose), null, 2);
    }
};
