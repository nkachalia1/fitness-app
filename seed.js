require('dotenv').config({ path: './fitness-tracker/backend/.env' }); // Update the path to your .env file
const mongoose = require('mongoose');
const Run = require('./backend/models/Run'); // Adjust the path as necessary
const User = require('./backend/models/User'); // Adjust the path as necessary

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const createRunDataForYear = async () => {
    // Replace 'demoUserId' with the actual ObjectId of your demo user
    const demoUserId = 'ObjectIdOfDemoUser'; // Replace with actual ObjectId

    let runs = [];
    let currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 1); // Set to one year ago

    // Generate a run for each week of the year
    for (let week = 0; week < 52; week++) {
        runs.push({
            author: demoUserId,
            distance: Math.floor(Math.random() * 10) + 1, // Random distance between 1 and 10
            hours: 0,
            minutes: Math.floor(Math.random() * 60), // Random minutes between 0 and 59
            seconds: Math.floor(Math.random() * 60), // Random seconds between 0 and 59
            createdAt: new Date(currentDate) // Set the created date
        });

        currentDate.setDate(currentDate.getDate() + 7); // Move to the next week
    }

    return runs;
};

const seedDB = async () => {
    const runs = await createRunDataForYear();
    await Run.insertMany(runs);
    console.log('Database seeded!');
    mongoose.connection.close();
};

seedDB();
