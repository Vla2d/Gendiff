import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

const formats = { 
  stylish: formatStylish, 
  plain: formatPlain, 
  json: formatJSON,
};

export default (diff, format) => {
  const getFormatType = formats[format];
  return getFormatType(diff);
};