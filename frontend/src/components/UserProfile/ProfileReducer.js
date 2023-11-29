import { SAVE_PROFILE, GET_PROFILE } from './ProfileActions';

const initialState = {
  profileData: {
    gender: '',
    age: '',
    location: '',
    height: '',
    weight: '',
  },
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PROFILE:
      return {
        ...state,
        profileData: action.payload,
      };
    case GET_PROFILE:
      // Handle GET_PROFILE action if needed
      return {
        ...state,
        // Update state with retrieved profileData
        profileData: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
