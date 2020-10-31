import React from 'react';
import { useDispatch, connect, useSelector } from 'react-redux'
import { loadFlockProfiles } from '../../actions/flockListActions'

function FlockList() {
  const dispatch = useDispatch();
  dispatch(loadFlockProfiles());
  const isLogged = useSelector(state => state.isLogged);
  const username = useSelector(state => state.user.info.username);
  return (isLogged ? (
    <div >
      <h1>hi</h1>
    </div>
  ) : <div></div>);
}

export default connect(null, { loadFlockProfiles })(FlockList);