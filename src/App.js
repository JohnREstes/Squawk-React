import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Body from './components/Body/Body'

function App(){
  return (
    <>
      <Header/>
      <div  className="container-fluid content">
        <Body />
      </div>
    </>
  )
}
export default App;