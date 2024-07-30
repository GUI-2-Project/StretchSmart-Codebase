const mongoose = require('mongoose');

// Configure MongoDB connection
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);     // See .env file for MONGO_URI

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;