import mongoose from 'mongoose';

import dotenv from 'dotenv'; // loads environment variables from a .env file into process.env
dotenv.config();

import colors from 'colors';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.blue.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
  }
};

connectDB();
