#!/usr/bin/env node

var downloader = require('./lib/downloader'),
    converter  = require('./lib/converter'),
    program    = require('commander'),
    fs         = require('fs');

//Help topic
program
    .version('0.1.0')
    .option('-o --output [filename]', 'Set output file(output.json by default)')
    .option('-v --verbose', 'Add verbose logging')
    .option('-q --quiet', 'Do not display output to console')
    .description('Parse provided website')

    //Main function
    .action(function(website) {
        var response = downloader.downloadPage(website);
        var result = JSON.stringify(converter.convertToJSON(response, program.verbose), null, 2);
        
        if (program.output) {
            var filename = (program.output) ? program.output : "output.json";
            fs.writeFileSync(filename, result);
        }
        
        if(program.quiet === undefined) {
            console.log(result);
        }
    });

// Examples
program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    html2json https://google.com   #parse and display output ');
    console.log('    html2json -o google.json https://google.com    #parse and save output to google.json');
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
