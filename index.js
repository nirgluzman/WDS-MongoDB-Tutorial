import mongoose from 'mongoose';
import User from './models/User.js';

import dotenv from 'dotenv'; // loads environment variables from a .env file into process.env
dotenv.config();

import colors from 'colors';

// connect to MongoDB with the mongoose.connect() method
const { MONGO_URI } = process.env;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.blue.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
  }
};

// https://www.youtube.com/watch?v=TP6Fzo1Ls58
const errorFormater = (error) => {
  const allErrors = error.substring(error.indexOf(':') + 1).trim();
  const allErrorsInArray = allErrors.split(',').map((err) => err.trim());

  const errors = {};
  allErrorsInArray.forEach((err) => {
    const [field, value] = err.split(':').map((e) => e.trim());
    errors[field] = value;
  });

  return errors;
};

// create/save a new user in the database
const createUser = async ({ name, age, email, hobbies, address }) => {
  const user = new User({ name, age, email, hobbies, address });

  try {
    await user.save(); // save the user to the database
    console.log('Created new User:', user);
  } catch (error) {
    switch (error.name) {
      case 'ValidationError': // Error handling for misc validation errors
        const keys = Object.keys(error.errors);
        const values = Object.values(error.errors).map((e) => e.message);
        console.error('Validation Error:', values.join(', '));
        break;
      case 'MongoServerError': // Error handling for duplicate email address
        if (error.code === 11000) {
          console.log('Duplicate Key Error: Email already exists');
        }
        break;
      default:
        console.log('Unknown Error:', error.message);
    }
  }
};

// findOne({name})
const findOne = async ({ name }) => {
  try {
    const user = await User.findByName(name);
    // const user = await User.find().byName(name);
    console.log('Found User:', user);

    if (user) {
      user.sayHi();
      console.log(user.fullAddress);
      user.save(); // trigger the middlewares
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error(error.message);
  }
};

connectDB();

createUser({
  name: 'Tim',
  age: 22,
  email: 'test@test.com',
  hobbies: ['coding', 'music'],
  address: { street: '123 Main St', city: 'Denver' },
});

findOne({ name: 'Tim' });




