import mongoose from 'mongoose';

// Schemas to define the structure of the document in the MongoDB collection

// Address Schema
const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
  });

// User Schema 
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'name is required'] },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65,
    validate: { validator: Number.isInteger, message: '{VALUE} is not an integer value' }, // works ONLY with save() and create() methods
  },
  email: { type: String, required: true, unique: true, match: [/\S+@\S+\.\S+/, 'invalid email address'], lowercase: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
  bestFriend: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hobbies: [String],
  address: addressSchema,
});

// Custom document instance methods, https://mongoosejs.com/docs/guide.html#methods
userSchema.methods.sayHi = function() {
  console.log(`Hi, my name is ${this.name}`);
};

// Custom static functions
userSchema.statics.findByName = function(name) {
  return this.findOne({ name });
}

// Custom query helpers to extend mongoose's chainable query builder API
userSchema.query.byName = function(name) {
  return this.where({ name }).limit(1);
}

// Virtual properties
userSchema.virtual('fullAddress').get(function() {
  return `${this.address.street}, ${this.address.city}`;
});

// Middleware to run before saving a document
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware to run after saving a document
userSchema.post('save', function(doc, next) {
  console.log(`${doc.name} was saved!`);
  next();
});

// Create a collection 'users' in MongoDB
const User = mongoose.model('User', userSchema); 

export default User;
