// Action Types
export const SAVE_PROFILE = 'SAVE_PROFILE';
export const GET_PROFILE = 'GET_PROFILE';

// Action Creators
export const saveUserProfileToDB = (profileData) => ({
  type: SAVE_PROFILE,
  payload: profileData,
});

export const getUserProfileFromDB = (profileData) => ({
  type: GET_PROFILE,
  payload: profileData,
});
