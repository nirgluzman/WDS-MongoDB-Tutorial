import mongoose from 'mongoose';

// User Schema to define the structure of the document in the MongoDB collection
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

// Model to create a collection in the MongoDB
const User = mongoose.model('User', userSchema);

export default User;
