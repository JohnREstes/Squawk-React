import React from 'react';
import { useSelector } from 'react-redux'

function Friends() {
  const store = useSelector(store => store)
  return (
        <div className="col-3 d-flex justify-content-center center-text" id="friends-div">
            <h1>Friends</h1>
        </div>
  );
}

export default Friends;