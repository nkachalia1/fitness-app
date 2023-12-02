import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout, login } from '../../store/session';
// import { openModal } from "../../store/ui";
import React, { useState, useEffect } from 'react';

function NavBar () {
  // const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(1);

  // useEffect(() => {
  //   // Redirect to the top ("/") after 5 seconds when the user logs out
  //   const logoutTimeout = setTimeout(() => {
  //     history.push('/');
  //   }, 5000);

  //   // Clear the timeout when the component unmounts or when the user logs in again
  //   return () => {
  //     clearTimeout(logoutTimeout);
  //   }; 
  // }, [history]);

  const handleTabHover = (index) => {
    setActiveTab(index);
  };

  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
      history.push('/');
      // setTimeout(() => {
      //   history.push('/');
      // }, 3000);
  }

  // const openLogin = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation()
  //   dispatch(openModal("login"));
  // }

  // const openSignup = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation()
  //   dispatch(openModal("signup"));
  // }

  // const handleDemoSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(login({ email:"abc@abc.com", password:"password" }));
  // }

  // const getLinks = () => {
  //   if (loggedIn) {
  //     return (
  //       <>
  //       <nav className="navbar navbar-default navbar-fixed-top">
  //         <ul id="main">
  //           <li onMouseOver={() => handleTabHover(1)}><Link to={'/runs'}>Everyone's Run</Link></li>
  //           <li onMouseOver={() => handleTabHover(2)}><Link to={'/profile'}>Your Runs</Link></li>
  //           <li onMouseOver={() => handleTabHover(3)}><Link to={'/runs/new'}>Write a Run</Link>
  //             <ul class="drop">
  //               <div>
  //               <li>scss</li>
  //               <li>jquery</li>
  //               <li>html</li>
  //               </div>
  //             </ul>
  //           </li>
  //           <li onMouseOver={() => handleTabHover(4)}><Link to={'/user_profile'}>User Profile</Link></li>
  //           <div id="marker" style={{ transform: `translate(${(activeTab - 1) * 120}px, 0)` }}></div>
  //         </ul>
  //       </nav>
  //       <div className="gradient-overlay" />
  //       </>
  //     );
  //   } else {
  //     return (
  //       <div className="links-auth">
  //         {/* <Link to={'/signup'}>Signup</Link>
  //         <Link to={'/login'}>Login</Link> */}
  //         <button
  //           className=''
  //           type="submit"
  //           onClick={openLogin}
  //         >
  //           <div className=''  data-font-weight="semibold">
  //             Log In
  //           </div>
  //         </button>
  //         <button
  //             className=''
  //             type="submit"
  //             onClick={openSignup}
  //           >
  //           <div className=''  data-font-weight="semibold" >
  //             Sign Up
  //           </div>
  //         </button>
  //         <button
  //           className=''
  //           type="submit"
  //           onClick={handleDemoSubmit}
  //         >
  //           <div className=''  data-font-weight="semibold">
  //             Demo Login
  //           </div>
  //         </button>
  //       </div>
  //     );
  //   }
  // }

  return (
    <>
      {/* <h1 style={{ color: 'blue', textAlign: 'center' }}>Fitness App</h1> */}
      {/* {getLinks()} */}
        <nav>
          <ul id="main">
            <li onMouseOver={() => handleTabHover(1)}><Link to={'/runs'}>Everyone's Run</Link></li>
            <li onMouseOver={() => handleTabHover(2)}><Link to={'/profile'}>Your Runs</Link></li>
            <li onMouseOver={() => handleTabHover(3)}><Link to={'/user_profile'}>User Profile</Link>
              <ul class="drop">
                <div>
                <li><Link to={'/runs/new'}>Write a Run</Link></li>
                <li>menu2</li>
                <li>menu3</li>
                </div>
              </ul>
            </li>
            <li onMouseOver={() => handleTabHover(4)} onClick={logoutUser}>Logout</li>
            <div id="marker" style={{ transform: `translate(${(activeTab - 1) * 130 + 516}px, 0)` }}></div>
          </ul>
        </nav>
    </>
  );
}

export default NavBar;
