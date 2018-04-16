import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';
import cfg from '../../cfg';

const { elasticSearch } = cfg;

const bookSchema = new mongoose.Schema({
  title: { type: String, es_indexed: true, es_boost: 2.0 },
  isbn: { type: String, es_indexed: true },
  price: Number,
  courseDpt: { type: String, es_indexed: true },
  ownerId: Number,
  sold: Boolean
});

// Attach mongoosastic to the schema
bookSchema.plugin(
  mongoosastic,
  {
    host: elasticSearch.host,
    port: elasticSearch.port,
    auth: elasticSearch.auth,
    hydrate: true,
    hydrateOptions: {select: 'title isbn price ownerId sold _id courseNo courseDpt'},
    filter: (book) => book.sold === true
  }
);

// Create the model
var Book = mongoose.model('Book', bookSchema);


const init = new Book({ title: 'init_book', isbn: '', sold: true }).save();


// Synchronize with elasticsearch
Book.synchronize();

export default Book;
