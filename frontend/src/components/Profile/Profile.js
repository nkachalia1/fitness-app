import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRuns, clearRunErrors } from '../../store/runs';
import RunBox from '../Runs/RunBox';
import './Profile.css';

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userRuns = useSelector(state => Object.values(state.runs.user))

  useEffect(() => {
    dispatch(fetchUserRuns(currentUser._id));
    return () => dispatch(clearRunErrors());
  }, [currentUser, dispatch]);

  if (userRuns.length === 0) {
    return <div>{currentUser.username} has no Runs</div>;
  } else {
    return (
      <>
        <h2 className="centered-heading">All of {currentUser.username}'s Runs</h2>
        {userRuns.map(run => (
          <RunBox
            key={run._id}
            run={run}
          />
        ))
      }
      </>
    );
  }
}

export default Profile;
