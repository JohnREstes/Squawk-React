import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {increment, decrement} from '../../actions/userActions'

function Friends() {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  return (
        <div className="col-3 text-center main-body" id="friends-div">
          <div className="row">
            <div className="col-12">
              <h1>Friends: {counter}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button className="button" onClick={() => dispatch(increment(1))}>+</button>
              <button className="button" onClick={() => dispatch(decrement(1))}>-</button>
            </div>
          </div>
        </div>
  );
}

export default Friends;