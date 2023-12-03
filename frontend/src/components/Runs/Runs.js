import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearRunErrors, fetchRuns } from '../../store/runs';
import RunBox from './RunBox';

function Runs() {
  const dispatch = useDispatch();
  debugger
  const runs = useSelector(state => Object.values(state.runs.all));
  // runs.map((run) => {
  //   console.log(run.distance)
  // });

  useEffect(() => {
    dispatch(fetchRuns());
    return () => dispatch(clearRunErrors());
  }, [dispatch]);

  if (runs.length === 0) return <div style={styles.noRuns}>There are no Runs</div>;

  return (
    <div style={styles.runsContainer}>
      <h2 style={styles.runsHeading}>All Runs</h2>
      <div style={styles.runsList}>
        {runs.map(run => (
          <RunBox key={run._id} run={run} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  runsContainer: {
    textAlign: 'center',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f5f5f5',
    maxWidth: '600px',
  },
  runsHeading: {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#333',
  },
  runsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  noRuns: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '18px',
    color: '#888',
  },
};

export default Runs;
