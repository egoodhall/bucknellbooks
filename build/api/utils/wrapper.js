"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var wrap = function wrap(success, data) {
  return { success: success, data: data };
};

exports.default = wrap;