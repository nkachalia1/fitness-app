
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RunGraph from '../Runs/RunGraph';
import { fetchUserRuns } from '../../store/runs';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const runs = useSelector(state => state.runs.user || []); 

  useEffect(() => {
    if (user) {
      dispatch(fetchUserRuns(user._id));
    }
  }, [dispatch, user]);

  // Check if runs is an array before trying to map over it
  const transformedRunsData = Array.isArray(runs) ? runs.map(run => ({
    date: new Date(run.createdAt),
    value: run.distance
  })) : [];

  // Transform runs data to match RunGraph format if necessary

  return (
    <main>
      {/* ...other user profile details... */}
      <h1>User Profile</h1>
      <div>Name : {user.username}</div>
      <div>Email : {user.email}</div>
      <div>Gender :</div>
      <div>Age :</div>
      <div>Location :</div>
      <div>Height :</div>
      <div>Weight :</div>
      <div>
        <h3>Your Running Data</h3>
        <RunGraph runningData={transformedRunsData} />
      </div>
    </main>
  );
};

export default UserProfile;

 