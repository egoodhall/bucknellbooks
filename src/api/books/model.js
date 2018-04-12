import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  _id: {
    type: Number,
    unique: true
  },
  title: String,
  isbn: String,
  price: Number,
  courseNo: Number,
  courseDpt: String,
  ownerId: Number,
  sold: Boolean
});

export default mongoose.model('Book', bookSchema);
