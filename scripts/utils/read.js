#!/usr/bin/env node
var fs = require('fs');
var _ = require('lodash');

fs.readFile(process.argv[2], 'utf8', (err, fStr) => {
  if (err) {
    console.log(err.message);
    return;
  }

  // Reformat config file
  fStr = '(() => {' + fStr.replace(/exports.default = (.+)\n/g, 'return $1 })();').replace(/const/g, 'var');

  // Evaluate config file
  const cfg = eval(fStr);

  if (_.has(cfg, process.argv[3])) {
    console.log(_.get(cfg, process.argv[3]));
  } else {
    console.log('Path not found');
    process.exit(1);
  }
});
