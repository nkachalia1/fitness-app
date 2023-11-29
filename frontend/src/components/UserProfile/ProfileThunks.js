import { saveUserProfileToDB } from './ProfileActions.js';
import { getUserProfileFromDB } from './ProfileActions.js';

export const saveUserProfileToDBThunk = (profileData) => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/profile/save', {
        method: 'POST',
        body: JSON.stringify(profileData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error saving profile data');
      }

      // Dispatch the action with the profileData sent to the server
      dispatch(saveUserProfileToDB(profileData));
    } catch (error) {
      console.error('Error saving profile:', error.message);
    }
  };
};

export const getUserProfileFromDBThunk = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/profile/get');

      if (!response.ok) {
        throw new Error('Error fetching profile data');
      }

      const profileData = await response.json();

      // Dispatch the action with the retrieved profile data
      dispatch(getUserProfileFromDB(profileData));
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    }
  };
};
