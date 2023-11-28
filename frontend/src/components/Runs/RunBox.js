import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRun } from '../../store/runs';
import "./RunBox.css";

function RunBox({ run }) {
  const { distance, time, author, _id: runId } = run;
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteRun(runId));
  };

  return (
    <div className="run">
      <h3>{author.username}</h3>
      <p>Distance: {distance} miles</p>
      <p>Time: {time}</p>
      {currentUser && currentUser._id === author._id && (
        <>
          <Link to={`/runs/update/${runId}`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}

export default RunBox;
