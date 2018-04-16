'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosastic = require('mongoosastic');

var _mongoosastic2 = _interopRequireDefault(_mongoosastic);

var _cfg = require('../../cfg');

var _cfg2 = _interopRequireDefault(_cfg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var elasticSearch = _cfg2.default.elasticSearch;


var bookSchema = new _mongoose2.default.Schema({
  title: { type: String, es_indexed: true, es_boost: 2.0 },
  isbn: { type: String, es_indexed: true },
  price: Number,
  courseDpt: { type: String, es_indexed: true },
  ownerId: Number,
  sold: Boolean
});

// Attach mongoosastic to the schema
bookSchema.plugin(_mongoosastic2.default, {
  host: elasticSearch.host,
  port: elasticSearch.port,
  auth: elasticSearch.auth,
  hydrate: true,
  hydrateOptions: { select: 'title isbn price ownerId sold _id courseNo courseDpt' },
  filter: function filter(book) {
    return book.sold === false;
  }
});

// Create the model
var Book = _mongoose2.default.model('Book', bookSchema);

var init = new Book({ title: 'init_book', isbn: '', sold: true }).save();

// Synchronize with elasticsearch
Book.synchronize();

exports.default = Book;