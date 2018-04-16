'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _books = require('../books');

var _wrapper = require('../utils/wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

var _soundex = require('soundex');

var _soundex2 = _interopRequireDefault(_soundex);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var respondData = function respondData(req, res) {
  return function (err, data) {
    // Log and return error
    if (err) {
      console.log(err.message);
      res.status(500).json((0, _wrapper2.default)(false, err.message));
      return;
    }
    // Return data
    res.json((0, _wrapper2.default)(true, data.hits.hits));
  };
};

var search = function search(req, res) {
  _books.Book.search({
    multi_match: {
      query: req.query.text,
      fuzziness: 2,
      fields: ['title', 'isbn', 'courseDpt'],
      slop: 10
    }
  }, respondData(req, res));
};

exports.default = {
  search: search
};