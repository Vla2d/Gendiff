import yaml from 'js-yaml';

const parsersTree = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};

export default (data, fileExt) => {
  const parse = parsersTree[fileExt];
  return parse(data);
};