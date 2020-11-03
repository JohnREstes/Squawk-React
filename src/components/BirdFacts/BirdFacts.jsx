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
              <div>
                <button className="birdButton" onClick={() => dispatch(createBirdFact())}>Next</button><br></br>
              <h4>Random Bird Fact: </h4>
              <h5>{fact}</h5>
              <br></br>
              </div>
              <div className="span9 centred"> 
                <h4>Random Bird Picture: </h4>
                <img id="bird-img" alt="birdie"/><br></br>
                <button className="birdButton" onClick={() => dispatch(createBirdImage())}>Next</button>
            </div>
            </div>
          </div>
  );
}

export default Friends;