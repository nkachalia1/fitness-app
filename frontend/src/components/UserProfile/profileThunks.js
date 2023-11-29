import { saveUserProfile, getUserProfile } from './profileActions';

export const saveUserProfileToDB = (profileData) => {
  return async (dispatch) => {
    try {
      // Perform API request to save profile data to the database
      // Example using fetch:
      const response = await fetch('/api/profile', {
        method: 'POST',
        body: JSON.stringify(profileData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Handle error if needed
        throw new Error('Error saving profile data');
      }

      // Dispatch action to update Redux state after successful save
      dispatch(saveUserProfile(profileData));
    } catch (error) {
      // Handle error
      console.error('Error saving profile:', error.message);
    }
  };
};

export const getUserProfileFromDB = () => {
  return async (dispatch) => {
    try {
      // Perform API request to fetch user profile data from the database
      const response = await fetch('/api/profile');

      if (!response.ok) {
        // Handle error if needed
        throw new Error('Error fetching profile data');
      }

      const profileData = await response.json();

      // Dispatch action to update Redux state with fetched profile data
      dispatch(saveUserProfile(profileData));
    } catch (error) {
      // Handle error
      console.error('Error fetching profile:', error.message);
    }
  };
};
