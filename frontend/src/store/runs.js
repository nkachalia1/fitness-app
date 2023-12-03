import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_RUNS = "runs/RECEIVE_RUNS";
const RECEIVE_USER_RUNS = "runs/RECEIVE_USER_RUNS";
const RECEIVE_NEW_RUN = "runs/RECEIVE_NEW_RUN";
const RECEIVE_RUN_ERRORS = "runs/RECEIVE_RUN_ERRORS";
const CLEAR_RUN_ERRORS = "runs/CLEAR_RUN_ERRORS";

const receiveRuns = runs => ({
  type: RECEIVE_RUNS,
  runs
});

const receiveUserRuns = runs => ({
  type: RECEIVE_USER_RUNS,
  runs
});

const receiveNewRun = run => ({
  type: RECEIVE_NEW_RUN,
  run
});

const receiveErrors = errors => ({
  type: RECEIVE_RUN_ERRORS,
  errors
});

export const clearRunErrors = errors => ({
    type: CLEAR_RUN_ERRORS,
    errors
});

export const fetchRuns = () => async dispatch => {
    try {
      const res = await jwtFetch ('/api/runs');
      const runs = await res.json();
      dispatch(receiveRuns(runs));
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
      }
    }
  };

export const FETCH_RUN_SUCCESS = 'FETCH_RUN_SUCCESS';

export const fetchRun = runId => async dispatch => {
  try {
    const res = await jwtFetch(`/api/runs/${runId}`);
    if (res.ok) {
      const run = await res.json();
      dispatch({
        type: FETCH_RUN_SUCCESS,
        payload: run,
      });
    }
  } catch (error) {
    console.log("error")
  }
};

  export const fetchUserRuns = id => async dispatch => {
    try {
      const res = await jwtFetch(`/api/runs/user/${id}`);
      const runs = await res.json();
      dispatch(receiveUserRuns(runs));
    } catch(err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const composeRun = data => async dispatch => {
    try {
      const res = await jwtFetch('/api/runs/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const run = await res.json();
      dispatch(receiveNewRun(run));
    } catch(err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };


export const UPDATE_RUN_SUCCESS = 'UPDATE_RUN_SUCCESS';
export const UPDATE_RUN_FAILURE = 'UPDATE_RUN_FAILURE';

export const updateRun = (runId, updatedRunData) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/runs/${runId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedRunData)
    });

    if (res.ok) {
      const run = await res.json();
      dispatch({
        type: UPDATE_RUN_SUCCESS,
        payload: run
      });
    } else {
      const errors = await res.json();
      dispatch({
        type: UPDATE_RUN_FAILURE,
        payload: errors
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_RUN_FAILURE,
      payload: error.message
    });
  }
};

export const DELETE_RUN_SUCCESS = 'DELETE_RUN_SUCCESS';
export const DELETE_RUN_FAILURE = 'DELETE_RUN_FAILURE';

export const deleteRun = runId => async dispatch => {
  try {
    const res = await jwtFetch(`/api/runs/${runId}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      dispatch({
        type: DELETE_RUN_SUCCESS,
        payload: runId
      });
    } else {
      const errors = await res.json();
      dispatch({
        type: DELETE_RUN_FAILURE,
        payload: errors
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_RUN_FAILURE,
      payload: error.message
    });
  }
};

const nullErrors = null;

export const runErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_RUN_ERRORS:
      return action.errors;
    case RECEIVE_NEW_RUN:
    case CLEAR_RUN_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const runsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    switch(action.type) {
      case RECEIVE_RUNS:
        debugger
        return { ...state, all: action.runs, new: undefined};
      case RECEIVE_USER_RUNS:
        return { ...state, user: action.runs, new: undefined};
      case RECEIVE_NEW_RUN:
        return { ...state, new: action.run};
      case RECEIVE_USER_LOGOUT:
        return { ...state, user: {}, new: undefined }
        case UPDATE_RUN_SUCCESS:
          return {...state, all: {...state.all, [action.payload._id]: action.payload}};
        case UPDATE_RUN_FAILURE:
          return {...state, errors: action.payload};
        case FETCH_RUN_SUCCESS:
            return {...state, all: {...state.all, [action.payload._id]: action.payload}};
        case DELETE_RUN_SUCCESS:
            let newState = { ...state}
          debugger
            newState = Object.values(state.all);
            delete newState.filter(run => run._id !== action.payload); 
            debugger
            return newState;
      default:
        return state;
    }
  };

  export default runsReducer;
