require('dotenv').config({ path: './backend/.env' }); // Ensure this line is at the top to load environment variables
const mongoose = require('mongoose');
const User = require('./backend/models/User'); // Update the path to your User model

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const findDemoUser = async () => {
    try {
        const demoUser = await User.findOne({ email: "abc@abc.com" }); 
        console.log("Demo User ID: ", demoUser._id);
        mongoose.connection.close();
    } catch (error) {
        console.error("Error finding demo user: ", error);
        mongoose.connection.close();
    }
};

findDemoUser();
