// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearRunErrors, composeRun } from '../../store/runs';
// import RunBox from './RunBox';
// import './RunCompose.css';

// function RunCompose () {
//   const [text, setText] = useState('');
//   const dispatch = useDispatch();
//   const author = useSelector(state => state.session.user);
//   const newRun = useSelector(state => state.runs.new);
//   const errors = useSelector(state => state.errors.runs);

//   useEffect(() => {
//     return () => dispatch(clearRunErrors());
//   }, [dispatch]);

//   const handleSubmit = e => {
//     e.preventDefault();
//     dispatch(composeRun({ text }));
//     setText('');
//   };

//   const update = e => setText(e.currentTarget.value);

//   return (
//     <>
//       <form className="compose-run" onSubmit={handleSubmit}>
//         <input
//           type="textarea"
//           value={text}
//           onChange={update}
//           placeholder="Write your run..."
//           required
//         />
//         <div className="errors">{errors?.text}</div>
//         <input type="submit" value="Submit" />
//       </form>
//       <div className="run-preview">
//         <h3>Run Preview</h3>
//         {text ? <RunBox run={{text, author}} /> : undefined}
//       </div>
//       <div className="previous-run">
//         <h3>Previous Run</h3>
//         {newRun ? <RunBox run={newRun} /> : undefined}
//       </div>
//     </>
//   )
// }

// export default RunCompose;












import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRunErrors, composeRun } from '../../store/runs';
import RunBox from './RunBox';
import './RunCompose.css';
import { savePreviousRun } from '../../store/runs'; // Import the action for saving previous run


function RunCompose() {
  const [distance, setDistance] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const dispatch = useDispatch();
  const author = useSelector(state => state.session.user);
  const newRun = useSelector(state => state.runs.new);
  const errors = useSelector(state => state.errors.runs);

  useEffect(() => {
    return () => dispatch(clearRunErrors());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();

    // Combine hours, minutes, and seconds into a single time string
    const time = `${hours}:${minutes}:${seconds}`;

    // Create an object representing the run
    const runData = {
      distance,
      time,
      author,
    };

    // Dispatch action to save the current run as the new previous run
    dispatch({ type: 'SAVE_PREVIOUS_RUN', payload: newRun });

    // Dispatch action to create the new run
    dispatch(composeRun(runData));
    dispatch(savePreviousRun()); // Ensure this action is defined in your actions file

    // Clear input fields after submission
    setDistance('');
    setHours('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <>
      <form className="compose-run" onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="distance">Distance in Miles:</label>
          <input
            type="number"
            id="distance"
            value={distance}
            onChange={e => setDistance(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="hours">Time - Hours:</label>
          <input
            type="number"
            id="hours"
            value={hours}
            onChange={e => setHours(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="minutes">Time - Minutes:</label>
          <input
            type="number"
            id="minutes"
            value={minutes}
            onChange={e => setMinutes(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="seconds">Time - Seconds:</label>
          <input
            type="number"
            id="seconds"
            value={seconds}
            onChange={e => setSeconds(e.target.value)}
            required
          />
        </div>
        <div className="errors">{errors?.text}</div>
        <input type="submit" value="Submit" />
      </form>
      <div className="run-preview">
        <h3>Run Preview</h3>
        <RunBox run={{ distance, time: `${hours}:${minutes}:${seconds}`, author }} />
      </div>
      <div className="previous-run">
        <h3>Previous Run</h3>
        {/* Display the new previous run */}
        {newRun ? <RunBox run={newRun} /> : undefined}
      </div>
    </>
  );
}

export default RunCompose;
