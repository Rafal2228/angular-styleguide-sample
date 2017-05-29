const path = require('path');
const _root = path.resolve(__dirname, '..');

exports.root = (...args) => path.join.apply(path, [_root, ...args]);
