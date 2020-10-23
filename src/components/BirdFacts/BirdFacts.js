import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { createBirdFact } from '../../actions/userActions'

function Friends() {
  const fact = useSelector(state => state.birdFact.fact);
  const dispatch = useDispatch();
  return (

          <div className="row">
            <div className="col-12">
            <button onClick={() => dispatch(createBirdFact())}>Generate</button><br></br>
              <h3>Randon Bird Fact: {fact}</h3>
            </div>
          </div>
  );
}

export default Friends;