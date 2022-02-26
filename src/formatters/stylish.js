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
    const buildLine = (char, value) => `${getIdent(spaces)}  ${char} ${node.name}: ${getString(value, spaces + 1)}`;
    switch (node.type) {
      case 'removed':
        return buildLine('-', node.value);
      case 'unchanged':
        return buildLine(' ', node.value);
      case 'changed':
        return `${getIdent(spaces)}  - ${node.name}: ${getString(node.valueBefore, spaces + 1)}\n ${getIdent(spaces)} + ${node.name}: ${getString(node.valueAfter, spaces + 1)}`;
      case 'added':
        return buildLine('+', node.value);
      case 'nested':
        return `${getIdent(spaces)}    ${node.name}: ${formatPretty(node.children, spaces + 1)}`;
      default:
        return false;
    }
  });
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${getIdent(spaces)}}`;
};

export default formatPretty;