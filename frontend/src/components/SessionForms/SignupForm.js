import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import './SessionForm.css';
import { signup, clearSessionErrors, RECEIVE_CURRENT_USER } from '../../store/session';
import { closeModal } from "../../store/ui";
import './LoginForm.css';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors.session);
  const modal = useSelector(state => state.ui.modal); 
  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };
    // Call the signup action and wait for the response
    const action = await dispatch(signup(user));
    
    // Check if the signup was successful
    if (action.type === RECEIVE_CURRENT_USER) {
      dispatch(closeModal());
    }
    // If not successful, do not close the modal, so the user can see the errors
  };

  return (
    <>
      { (modal === "signup" && !user) &&
        <div className="modal-body" onClick={() => dispatch(closeModal())}>
          <div className='wrapper'>
            <form className="session-form signup-session-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
              <h2>Sign Up</h2>
              <div className='session-form-cussion'></div>
              <div className="errors">{errors?.email}</div>
              <input type="text"
                value={email}
                onChange={update('email')}
                placeholder="Email"
              />
              <div className="errors">{errors?.username}</div>
              <input type="text"
                value={username}
                onChange={update('username')}
                placeholder="Username"
              />
              <div className="errors">{errors?.password}</div>
              <input type="password"
                value={password}
                onChange={update('password')}
                placeholder="Password"
              />
              <div className="errors">
                {password !== password2 && 'Confirm Password field must match'}
              </div>
              <input type="password"
                value={password2}
                onChange={update('password2')}
                placeholder="Confirm Password"
              />
              <div className='session-form-cussion2'></div>
              <button
                type="submit"
                disabled={!email || !username || !password || password !== password2}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      }
    </>
  );
}

export default SignupForm;
