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
            <button className="birdButton" onClick={() => dispatch(createBirdFact())}>Generate</button><br></br>
              <h4>Random Bird Fact: </h4>
              <br></br>
              <h5>{fact}</h5>
              <br></br>
            </div>
            <div className="container">
            <div className="row">
              <div className="span9 centred"> 
                <h5>Random Bird Picture: </h5>
                <img id="bird-img" alt="birdie"/><br></br>
                <button className="birdButton" onClick={() => dispatch(createBirdImage())}>Generate</button>
              </div>
              </div>
            </div>
          </div>
  );
}

export default Friends;