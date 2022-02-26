import _ from "lodash";

const genDiff = (file1, file2) => {
  const keys = _.orderBy(_.union(Object.keys(file1), Object.keys(file2)));

  const diff = keys.map((node) => {
    if (!_.has(file1, node)) {
      return {
        name: node,
        type: "added",
        value: file2[node],
      };
    }
    if (!_.has(file2, node)) {
      return { name: node, type: "removed", value: file1[node] };
    }
    if (_.isObject(file1[node]) && _.isObject(file2[node])) {
      return {
        name: node,
        type: "nested",
        children: genDiff(file1[node], file2[node]),
      };
    }
    if (
      typeof file1[node] !== typeof file2[node] ||
      file1[node] !== file2[node]
    ) {
      return {
        name: node,
        type: "changed",
        valueBefore: file1[node],
        valueAfter: file2[node],
      };
    }
    return { name: node, type: "unchanged", value: file1[node] };
  });
  return _.sortBy(diff, "name");
};

export default genDiff;
