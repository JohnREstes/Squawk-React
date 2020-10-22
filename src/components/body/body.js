import React from 'react'
import '../../App.css'
import Friends from './friends-bar'
import Login from '../../components/login'
import Feed from '../../components/Feed'
import CreateNewUser from '../createNewUser'
import {useSelector, useDispatch} from 'react-redux'




function Body(){
  const isLogged = useSelector(state => state.isLogged);
  const newUser = false;

  if(isLogged){
    return (
      <div className="row main-body">
        <div className="col-3">

        </div>
        <CreateNewUser/>
        <Friends/>
      </div>
    )
  
  }else if(!isLogged && newUser){
    return (
      <div className="row main-body">
        <div className="col-3">

        </div>
        <CreateNewUser/>
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