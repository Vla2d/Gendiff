import { fileURLToPath } from 'url';
import path from 'path';

import genDiff from '../src/index.js';
import { readFileContent } from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (filename) => path.join(__dirname, '..', '__tests__/__fixtures__', filename);
const readFile = (filename) => readFileContent(getPath(filename), 'utf-8');

const expectedStylish = readFile('result-stylish.txt');
const expectedPlain = readFile('result-plain.txt');
const expectedJson = readFile('result-json.txt');

const extensions = ['json', 'yml'];

test.each(extensions)('Gendiff files - %s:', (format) => {
  const file1 = getPath(`file1.${format}`);
  const file2 = getPath(`file2.${format}`);

  expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(file1, file2, 'json')).toEqual(expectedJson);
});
