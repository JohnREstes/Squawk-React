import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import Header from './components/header/header'
import Body from './components/body/body'

class App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        this.props.dispatch({
          type: 'LOAD_POSTS',
          payload: json
        })
      })
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Body />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(
  mapDispatchToProps
)(App)