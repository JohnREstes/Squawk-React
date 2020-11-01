import React from 'react'
import '../../App.css'
import Login from '../Login/Login'
import Feed from '../Feed/Feed'
import EditUser from '../EditUser/EditUser'
import UserRegistration from '../UserRegistration/UserRegistration'
import BirdBar from '../BirdBar/BirdBar'
import { useSelector } from 'react-redux'
import $ from 'jquery'
import { FEED, FRIENDS, EDIT_PROFILE, CREATE_ACCOUNT } from '../../actions/types'
import MyFlock from '../MyFlock/MyFlock'
import FlockList from '../FlockList/FlockList'
import FlockListBlank from '../FlockList/FlockListBlank'

function Body(){
  const isLogged = useSelector(state => state.isLogged);
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
          <FlockListBlank/>
        </div>
        )  
  }else{
        return (
        <div className="row">
          <BirdBar/>
          <Login/>
          <FlockListBlank/>
        </div>
      )
  } 
}

export default Body