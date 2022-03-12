import fs from 'fs';
import path from 'path';
import process from 'process';

const getFullPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);

export const readFileContent = (pathToFile) => fs.readFileSync(getFullPath(pathToFile), 'utf-8')

export const getExt = (pathToFile) => path.extname(pathToFile);