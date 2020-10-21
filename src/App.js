import React from 'react'
import {useSelector} from 'react-redux'
import Header from './components/header/header'
import Body from './components/body/body'

function App(){
  const isLogged = useSelector(state => state.isLogged);
  return (
    <div className="container-fluid">
      <Header/>
      <Body />

      {isLogged ? <h3>You are logged in</h3> : ''}
    </div>
  )
}
export default App;