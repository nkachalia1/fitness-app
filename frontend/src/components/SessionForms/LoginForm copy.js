import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';
import './LoginForm.css';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const modal = useSelector(state => state.ui.modal); // Naoko added

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  return (
    <>
      { (modal === "login") && // Naoko added 
      // <div className='login-modal-body' >
        <form className="modal-body session-form" onSubmit={handleSubmit}>
          <h2>Log In Form</h2>
          <div className="errors">{errors?.email}</div>
          <label>
            <span>Email</span>
            <input type="text"
              value={email}
              onChange={update('email')}
              placeholder="Email"
            />
          </label>
          <div className="errors">{errors?.password}</div>
          <label>
            <span>Password</span>
            <input type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
          </label>
          <input
            type="submit"
            value="Log In"
            disabled={!email || !password}
          />
        </form>
      // </div>
      } 
    </>
  )

}

export default LoginForm;
