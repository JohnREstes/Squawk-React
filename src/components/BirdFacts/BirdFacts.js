import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { createBirdFact, createBirdImage } from '../../actions/birdActions'
import $ from 'jquery'

function Friends() {
  const fact = useSelector(state => state.birdFact.fact);
  const imageURL = useSelector(state => state.birdFact.link);
  $('#bird-img').attr("src", imageURL);
  const dispatch = useDispatch();
  return (

          <div className="row">
            <div className="col-12">
            <button onClick={() => dispatch(createBirdFact())}>Generate</button><br></br>
              <h5>Randon Bird Fact: {fact}</h5>
              </div>
              <div className="row">
              <div className="col-12"> 
                <h5>Randon Bird Picture: </h5>
                <img id="bird-img" alt="birdie" className="image-fluid"/><br></br>
                <button onClick={() => dispatch(createBirdImage())}>Generate</button>
              </div>
            </div>
          </div>
  );
}

export default Friends;