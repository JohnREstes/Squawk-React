import React from 'react';
import {useDispatch} from 'react-redux'
import {loginToggle} from '../../actions'

function Header() {
  const dispatch = useDispatch();
  return (
    <div className="row" id="main-header">
      <div className="col-2"></div>
        <div className="col-8 d-flex justify-content-center center-text">
            <h1>Squawk</h1>
        </div>
        <div className="col-2">
          <button onClick={() => dispatch(loginToggle())}>Log In Toggle</button>
        </div>
    </div>
  );
}

export default Header;