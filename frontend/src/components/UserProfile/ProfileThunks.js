import { saveUserProfileToDB } from './ProfileActions.js';
import { getUserProfileFromDB } from './ProfileActions.js';

export const saveUserProfileToDBThunk = (profileData) => {
  debugger
  return async (dispatch) => {
    try {
      const response = await fetch('/api/profile/save', {
        method: 'POST',
        body: JSON.stringify(profileData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      debugger

      if (!response.ok) {
        throw new Error('Error saving profile data');
      }

      debugger

      // Dispatch the action with the profileData sent to the server
      dispatch(saveUserProfileToDB(profileData));
    } catch (error) {
      console.error('Error saving profile:', error.message);
    }

    debugger
  };
};

debugger

export const getUserProfileFromDBThunk = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/profile/get');

      debugger

      if (!response.ok) {
        throw new Error('Error fetching profile data');
      }

      debugger

      const profileData = await response.json();

      // Dispatch the action with the retrieved profile data
      dispatch(getUserProfileFromDB(profileData));

      debugger

    } catch (error) {
      console.error('Error fetching profile:', error.message);
    }
    debugger
  };
};
