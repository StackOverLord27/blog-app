const mongoose = require('mongoose');

let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) {
    console.log('Using cached database connection');
    return cachedDb;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://your-mongodb-uri', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    cachedDb = conn;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return cachedDb;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 