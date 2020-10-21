import React from 'react'
import './App.css'
import Header from './components/header/header'
import Body from './components/body/body'

function App(){
  return (
    <div className="container-fluid full-page">
      <Header/>
      <Body />
    </div>
  )
}
export default App;