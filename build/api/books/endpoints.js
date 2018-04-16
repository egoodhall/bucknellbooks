'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('./model.js');

var _model2 = _interopRequireDefault(_model);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _wrapper = require('../utils/wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

var _soundex = require('soundex');

var _soundex2 = _interopRequireDefault(_soundex);

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
    res.json((0, _wrapper2.default)(true, data));
  };
};

/**
 * Get a book (or multiple) from the database
 * @param {object} req The request object
 * @param {object} res The response object
 */
var getItem = function getItem(req, res) {
  var _req$params = req.params,
      id = _req$params.id,
      uid = _req$params.uid;

  // Decide which data to find

  if (id) {
    _model2.default.findOne({ _id: id }, respondData(req, res));
  } else if (uid) {
    _model2.default.find({ ownerId: uid }, respondData(req, res));
  } else {
    _model2.default.find({}, respondData(req, res));
  }
};

var postItem = function postItem(req, res) {
  req.body.uid = req.params.uid;
  new _model2.default(req.body).save(respondData(req, res));
};

var putItem = function putItem(req, res) {
  if (req.body.title) {
    req.body.soundex = (0, _lodash2.default)(req.body.title).split(' ').map(function (str) {
      return (0, _soundex2.default)(str);
    }).join(' ');
  }
  _model2.default.update({ _id: req.params.id }, req.body, respondData(req, res));
};

var deleteItem = function deleteItem(req, res) {
  _model2.default.deleteOne({ _id: req.params.id }, respondData(req, res));
};

exports.default = {
  getItem: getItem,
  postItem: postItem,
  putItem: putItem,
  deleteItem: deleteItem
};