import mongoose from 'mongoose';
import mongoosastic from 'mongoosastic';
import cfg from '../../cfg';

const { elasticSearch } = cfg;

const bookSchema = new mongoose.Schema({
  title: { type: String, es_indexed: true, es_boost: 2.0 },
  isbn: { type: String, es_indexed: true },
  price: Number,
  course: { type: String, es_indexed: true },
  ownerId: String,
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
    hydrateOptions: {select: 'title isbn price course ownerId sold _id'},
    filter: (book) => book.sold === true
  }
);

// Create the model
var Book = mongoose.model('Book', bookSchema);

// Initialize for elasticsearch if running on a clean
// database
Book.findOne({ title: 'init_book' }, (err, res) => {
  if (err || res === null) {
    console.log('Initializing books in database');
    new Book({
      title: 'init_book',
      isbn: 'fake',
      sold: true,
      course: 'CSCI 420',
      ownerId: -1,
      price: -1.00
    }).save();
    Book.synchronize();
  }
});


// Synchronize with elasticsearch
Book.synchronize();

export default Book;
