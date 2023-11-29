import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserProfile.css';
import { saveUserProfileToDBThunk, getUserProfileFromDBThunk } from './ProfileThunks';
import { saveUserProfileToDB, getUserProfileFromDB } from './ProfileActions';

const UserProfile = () => {
  debugger
  const dispatch = useDispatch();
  const profileInfo = useSelector(state => state.profile.profileData);
  const user = useSelector(state => state.session.user);
  const loggedIn = useSelector(state => !!state.session.user);

  debugger

   // State to hold user profile data
   const [profileData, setProfileData] = useState({
    gender: '',
    age: '',
    location: '',
    height: '',
    weight: '',
  });

  debugger

    // Function to handle form input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProfileData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    };

    debugger

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(saveUserProfileToDB(profileData));
    };

    debugger

    useEffect(() => {
      dispatch(getUserProfileFromDB());
    }, [dispatch]);

    debugger

  if (!user) {
    return null;
  }

  debugger

  if (loggedIn) {
    return (
      <main className="fitness-profile">
        <h1>User Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="profile-details">
          <div className="profile-item">
            <span className="label">Name:</span>
            <span className="value">{user.username}</span>
          </div>
          <div className="profile-item">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>
          <div className="profile-item">
            <span className="label">Gender:</span>
            <input
                type="text"
                name="gender"
                value={profileData.gender}
                onChange={handleInputChange}
              />
          </div>
          <div className="profile-item">
            <span className="label">Age:</span>
            <input
                type="text"
                name="age"
                value={profileData.age}
                onChange={handleInputChange}
              />
          </div>
          <div className="profile-item">
            <span className="label">Location:</span>
            <input
                type="text"
                name="location"
                value={profileData.location}
                onChange={handleInputChange}
              />
          </div>
          <div className="profile-item">
            <span className="label">Height:</span>
            <input
                type="text"
                name="height"
                value={profileData.height}
                onChange={handleInputChange}
              />
          </div>
          <div className="profile-item">
            <span className="label">Weight:</span>
            <input
                type="text"
                name="weight"
                value={profileData.weight}
                onChange={handleInputChange}
              />
          </div>
          <button type="submit">Save Profile</button>
          </div>
        </form>

      {/* Display user profile information */}
      <div className="profile-details">
          {/* Use profileData to display user information */}
          <div className="profile-item">
            <span className="label">Name:</span>
            <span className="value">{user.username}</span>
          </div>
          {/* Display other profile information similarly */}
          <div className="profile-item">
            <span className="label">Email:</span>
            <span className="value">{user .email}</span>
          </div>

          <div className="profile-item">
            <span className="label">Gender:</span>
            <span className="value">{profileData.gender}</span>
          </div>

          <div className="profile-item">
            <span className="label">Location:</span>
            <span className="value">{profileData.location}</span>
          </div>

          <div className="profile-item">
            <span className="label">Age:</span>
            <span className="value">{profileData.age}</span>
          </div>

          <div className="profile-item">
            <span className="label">Height:</span>
            <span className="value">{profileData.height}</span>
          </div>

          <div className="profile-item">
            <span className="label">Weight:</span>
            <span className="value">{profileData.weight}</span>
          </div>
        </div>
      </main>
    );
  }
};

export default UserProfile;
