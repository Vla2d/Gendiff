import _ from "lodash";

const genDiff = (file1, file2) => {
  const keys = _.orderBy(_.union(Object.keys(file1), Object.keys(file2)));

  const diff = keys.map((node) => {
    if (!_.has(file1, node)) {
      return {
        key: node,
        state: "added",
        newValue: file2[node],
      };
    }
    if (!_.has(file2, node)) {
      return { key: node, state: "deleted", oldValue: file1[node] };
    }
    if (_.isObject(file1[node]) && _.isObject(file2[node])) {
      return {
        key: node,
        state: "nested",
        children: genDiff(file1[node], file2[node]),
      };
    }
    if (
      typeof file1[node] !== typeof file2[node] ||
      file1[node] !== file2[node]
    ) {
      return {
        key: node,
        state: "changed",
        oldValue: file1[node],
        newValue: file2[node],
      };
    }
    return { key: node, state: "unchanged", oldValue: file1[node] };
  });
  return _.sortBy(diff, "name");
};

export default genDiff;
