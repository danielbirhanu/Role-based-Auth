const mongoose = require('mongoose');

const connnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_STRING);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connnectDb;
