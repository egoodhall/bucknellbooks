'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('./model.js');

var _model2 = _interopRequireDefault(_model);

var _wrapper = require('../utils/wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

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

var getItem = function getItem(req, res) {
  var uid = req.params.uid;

  _model2.default.findOne({ _id: uid }, respondData(req, res));
};

var postItem = function postItem(req, res) {
  req.body._id = req.params.uid;
  console.log('Made it past)');
  try {
    new _model2.default(req.body).save(respondData(req, res));
  } catch (err) {
    res.status(500).json((0, _wrapper2.default)(false, err.message));
  }
};

exports.default = {
  getItem: getItem,
  postItem: postItem
};