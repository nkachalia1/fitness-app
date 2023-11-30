import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, useLocation } from 'react-router-dom';
// import { Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthRoute, ProtectedRoute } from './components/routes/routes';
// import { useSelector } from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import RunUpdateForm from './components/Runs/RunUpdateForm';
import Runs from './components/Runs/Runs';
import Profile from './components/Profile/Profile';
import RunCompose from './components/Runs/RunCompose';
import UserProfile from './components/UserProfile/UserProfile';

import { getCurrentUser } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);
  // const loggedIn = useSelector(state => !!state.session.user);

  const location = useLocation();
  const isTopPage = location.pathname === '/';

  return loaded && (
    <>
      {/* <MainPage /> */}
      {!isTopPage && <NavBar />}
      <LoginForm />
      <SignupForm />
      <Switch>
        {/* <Route exact path="/user_profile">
          {loggedIn ? <UserProfile /> : <Redirect to="/login" />}
        </Route> */}
        <AuthRoute exact path="/" component={MainPage} />
        {/* <AuthRoute exact path="/navbar" component={NavBar} /> */}
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <ProtectedRoute exact path="/runs" component={Runs} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/user_profile" component={UserProfile} />
        <ProtectedRoute exact path="/runs/new" component={RunCompose} />
        <ProtectedRoute exact path="/runs/update/:id" component={RunUpdateForm} />
    
      </Switch>
    </>
  );
}

export default App;
