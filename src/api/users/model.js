import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: {
    type: Number,
    unique: true
  },
  name: String,
  email: String,
  books: Array
});

export default mongoose.model('User', userSchema);
