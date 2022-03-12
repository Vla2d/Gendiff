import path from "path";
import fs from "fs";
import genDiff from "../src/index.js";

const getPath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);

const readFile = (filename) =>
  fs.readFileSync(getPath(filename), "utf-8").trim();

const expectedStylish = readFile('./__fixtures__/result-stylish.txt');
const expectedPlain = readFile('./__fixtures__/result-plain.txt');
const expectedJson = readFile('./__fixtures__/result-json.txt');

const formats = ['json', 'yml'];

test.each(formats)('Gendiff files - %s:', (format) => {
  const fileName = getFixturePath(`fileName.${format}`);
  const fileExtension = getFixturePath(`fileExtension.${format}`);

  expect(genDiff(fileName, fileExtension, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(fileName, fileExtension, 'plain')).toEqual(expectedPlain);
  expect(genDiff(fileName, fileExtension, 'json')).toEqual(expectedJson);
});