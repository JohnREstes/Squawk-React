import React from 'react'
import '../../App.css'
import FlockList from '../FlockBar/FlockBar'
import Login from '../Login/Login'
import Feed from '../Feed/Feed'
import EditUser from '../EditUser/EditUser'
import UserRegistration from '../UserRegistration/UserRegistration'
import BirdBar from '../BirdBar/BirdBar'
import { useSelector, useDispatch } from 'react-redux'
import $ from 'jquery'
import { FEED, FRIENDS, EDIT_PROFILE, CREATE_ACCOUNT } from '../../actions/types'
import MyFlock from '../MyFlock/MyFlock'

function Body(){
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();
  const pageDisplayed = useSelector(state => state.pageDisplayed.type);
  
  if(isLogged){
    $("#navButtonsDiv").css("display", "initial")
    switch(pageDisplayed){
      case FEED:
        return (
          <div className="row">
            <BirdBar/>
            <Feed/>
            <FlockList/>
            
          </div>
        )
      case FRIENDS:
        return (
          <div className="row">
            <BirdBar/>
            <MyFlock/>
            <FlockList/>
          </div>
          )
      case EDIT_PROFILE:
        return (
          <div className="row">
            <BirdBar/>
            <EditUser/>
            <FlockList/>
          </div>
          )    
      default:
    }
  }else if(isLogged === false && pageDisplayed === CREATE_ACCOUNT){
      return (
        <div className="row">
          <BirdBar/>
          <UserRegistration/>
          <FlockList/>
        </div>
        )  
  }else{
        return (
        <div className="row">
          <BirdBar/>
          <Login/>
          <FlockList/>
        </div>
      )
  } 
}

export default Body