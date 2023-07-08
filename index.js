import mongoose from 'mongoose';
import User from './models/User.js';

import dotenv from 'dotenv'; // loads environment variables from a .env file into process.env
dotenv.config();

import colors from 'colors';

// connect to MongoDB with the mongoose.connect() method
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.blue.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
  }
};

// create/save a new user in the database
const createUser = async ({ name, age, email, hobbies, address }) => {
  const user = new User({ name, age, email, hobbies, address });

  try {
    await user.save(); // save the user to the database
    console.log('Created new User:', user);
  } catch (error) {
    console.error(error.message);
  }
};

// findOne({name})
const findOne = async ({ name }) => {
  try {
    const user = await User.findByName(name);
    console.log('Found User:', user);
    if (user) {
      user.sayHi();
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

findOne({name: 'Tim'});




