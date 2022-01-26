#!/usr/bin/env node

const { program } = require('commander');

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<pathToFile1> <pathToFile2>')
  .option('-f, --format [type]', 'output format')
  //.action((pathToFile1, pathToFile2) => {
    //const result = 1;//genDiff(pathToFile1, pathToFile2, program.format);
    //console.log(result);
  //})
  .parse(process.argv);