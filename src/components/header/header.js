import React from 'react';
import { useDispatch, connect, useSelector } from 'react-redux'
import { feed, friends, editProfile, loginToggle } from '../../actions/userActions'

function Header() {
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.isLogged);
  //const username = useSelector(state => state.user.userDetails.username);
  return (
    <div className="header" id="main-header">
      <div className="row">
      <div className="col-2">
      <button onClick={() => dispatch(loginToggle())}>Log In Toggle</button><br></br>
      {isLogged ? <h6>, you are logged in.</h6> : ''}
      </div>
        <div className="col-8">
            <div className="row">
              <div className="col-12 d-flex justify-content-center center-text">
                <h1>Squawk</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex justify-content-center center-text">
                <h5>Where the bird enthusiasts gather</h5>
              </div>
            </div>
        </div>
        <div className="col-2">
          <div className="row hidden justiy-content-center" id="navButtonsDiv">
            <button id="navButtons" onClick={() => dispatch(friends())}>Friends</button>
            <button id="navButtons" onClick={() => dispatch(editProfile())}>Edit Profile</button>
            <button id="navButtons" onClick={() => dispatch(feed())}>Home</button>
          </div>
          </div>  
        </div>
        <div className="progress-container">
          <div className="progress-bar" id="myBar"></div>
        </div>
    </div>
  );
}

export default connect(null, { feed, friends, editProfile })(Header);