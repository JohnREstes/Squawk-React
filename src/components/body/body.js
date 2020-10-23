import React from 'react'
import '../../App.css'
import Friends from '../FriendsBar/FriendsBar'
import Login from '../Login/Login'
import Feed from '../Feed/Feed'
import CreateNewUser from '../UserRegistration/UserRegistration'
import {useSelector, useDispatch} from 'react-redux'
import $ from 'jquery'




function Body(){
  const isLogged = useSelector(state => state.isLogged);
  const newUser = false;

  if(isLogged){
    $("#navButtonsDiv").css("display", "initial");
    return (
      <div className="row main-body">
        <div className="col-3">

        </div>
        <Feed/>
        <Friends/>
      </div>
    )
  
  }else if(!isLogged){
    return (
      <div className="row main-body">
        <div className="col-3">

        </div>
        <Login/>
        <Friends/>
      </div>
    )
  }else{
    return (
      <div className="row main-body">
        <div className="col-3">

        </div>
        <Login/>
        <Friends/>
      </div>
    )
  }
}

export default Body