import _ from 'lodash';

const getIdent = (spaces) => ('    '.repeat(spaces));

const getString = (value, spaces = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  const lines = _.keys(value).map((node) => `${getIdent(spaces)}    ${node}: ${getString(value[node], spaces + 1)}`);
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${getIdent(spaces)}}`;
};

const formatPretty = (diff, spaces = 0) => {
  const lines = diff.map((node) => {
    const buildLine = (char, value) => `${getIdent(spaces)}  ${char} ${node.key}: ${getString(value, spaces + 1)}`;
    switch (node.state) {
      case 'deleted':
        return buildLine('-', node.oldValue);
      case 'unchanged':
        return buildLine(' ', node.oldValue);
      case 'changed':
        return `${getIdent(spaces)}  - ${node.key}: ${getString(node.oldValue, spaces + 1)}\n ${getIdent(spaces)} + ${node.key}: ${getString(node.newValue, spaces + 1)}`;
      case 'added':
        return buildLine('+', node.newValue);
      case 'nested':
        return `${getIdent(spaces)}    ${node.key}: ${formatPretty(node.children, spaces + 1)}`;
      default:
        return false;
    }
  });
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${getIdent(spaces)}}`;
};

export default formatPretty;
