import React from 'react'
import '../../App.css'
import Friends from './friends-bar'
import Login from '../../components/login'
import Feed from '../../components/Feed'
import {useSelector, useDispatch} from 'react-redux'
import {isLogged} from '../../actions'



function Body(){
  const isLogged = useSelector(state => state.isLogged);

  if(isLogged){
    return (
      <div className="row main-body">
        <div className="col-3">

        </div>
        <Feed/>
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