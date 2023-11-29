const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/profiles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Define a schema for user profiles
const profileSchema = new mongoose.Schema({
  gender: String,
  age: Number,
  location: String,
  height: String,
  weight: String,
});

const Profile = mongoose.model('Profile', profileSchema);

// Save user profile data endpoint
app.post('/api/profile/save', async (req, res) => {
  try {
    const { gender, age, location, height, weight } = req.body;

    // Create a new profile instance
    const newProfile = new Profile({
      gender,
      age,
      location,
      height,
      weight,
    });

    // Save the profile data to the database
    await newProfile.save();

    res.status(200).json({ message: 'Profile data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save profile data' });
  }
});

// Fetch user profile data endpoint
app.get('/api/profile/get', async (req, res) => {
  try {
    // Retrieve all profiles from the database
    const profiles = await Profile.find();

    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile data' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
