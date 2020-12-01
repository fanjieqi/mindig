var _ = require('lodash');

function exportListToMarkdownByDfs(items) {
  let stack = [];
  let mark = {}
  stack.push([0, 0])
  mark[0] = true
  let result = '';
  const sep = "\r\n";
  while (stack.length) {
    const info = stack.pop()
    const itemId = info[0]
    const level = info[1]
    const title = items[itemId].title;
    const length = title.length;
    if (level === 0) {
      result += `${title}${sep}${'='.repeat(length)}${sep}`
    } else if (level === 1) {
      result += `${sep}${title}${sep}${'-'.repeat(length)}${sep}`
    } else {
      result += `${'  '.repeat(level - 2)}* ${title}${sep}`
    }
    _.eachRight(items[itemId].children, (childId) => {
      if (!mark[childId]) {
        stack.push([childId, level + 1]);
        mark[childId] = true;
      }
    })
  }
  return result;
}

export default exportListToMarkdownByDfs;
