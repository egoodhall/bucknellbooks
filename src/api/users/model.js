import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  email: String
});

export default mongoose.model('User', userSchema);
