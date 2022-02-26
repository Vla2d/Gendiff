import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getNodeName = (node, ancestor) => {
  if (ancestor === '') {
    return `${node.name}`;
  }
  return `${ancestor}.${node.name}`;
};

const formatPlain = (diff, ancestor = '') => {
  const lines = diff
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      switch (node.type) {
        case 'removed':
          return `Property '${getNodeName(node, ancestor)}' was removed`;
        case 'changed':
          return `Property '${getNodeName(node, ancestor)}' was updated. From ${getValue(node.valueBefore)} to ${getValue(node.valueAfter)}`;
        case 'added':
          return `Property '${getNodeName(node, ancestor)}' was added with value: ${getValue(node.value)}`;
        case 'nested':
          return formatPlain(node.children, getNodeName(node, ancestor));
        default:
          return false;
      }
    });
  const innerValue = lines.join('\n');
  return innerValue;
};

export default formatPlain;