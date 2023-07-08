import mongoose from 'mongoose';

// Schemas to define the structure of the document in the MongoDB collection

// Address Schema
const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
  });

// User Schema 
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 18, max: 65 },
  email: { type: String, required: true, unique: true, lowercase: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
  bestFriend: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hobbies: [String],
  address: addressSchema,
});

// Model to create a collection in the MongoDB
const User = mongoose.model('User', userSchema);

export default User;
