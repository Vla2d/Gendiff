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
    return `${node.key}`;
  }
  return `${ancestor}.${node.key}`;
};

const formatPlain = (diff, ancestor = '') => {
  const lines = diff
    .filter((node) => node.state !== 'unchanged')
    .map((node) => {
      switch (node.state) {
        case 'deleted':
          return `Property '${getNodeName(node, ancestor)}' was removed`;
        case 'changed':
          return `Property '${getNodeName(node, ancestor)}' was updated. From ${getValue(node.oldValue)} to ${getValue(node.newValue)}`;
        case 'added':
          return `Property '${getNodeName(node, ancestor)}' was added with value: ${getValue(node.newValue)}`;
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