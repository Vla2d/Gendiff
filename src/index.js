import { readFile, getExt } from './utils.js';
import parse from './parsers.js';
import genDiff from './genDiff.js';
import render from './formatters/index.js';

export default (path1, path2, format = 'stylish') => {
  const file1 = readFile(path1);
  const file2 = readFile(path2);
  const ext1 = getExt(path1);
  const ext2 = getExt(path2);

  const firstFileParsed = parse(file1, ext1);
  const secondFileParsed = parse(file2, ext2);

  const diff = genDiff(firstFileParsed, secondFileParsed);

  return render(diff, format);
};