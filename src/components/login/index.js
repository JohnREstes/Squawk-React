import React from 'react'
import '../../App.css'
import { connect } from 'react-redux'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      user: '',
      password: '',
      postId: 2
    }

    this.handleUserChange = this.handleUserChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleUserChange(event) {
    this.setState({ 
        user: event.target.value
     })
  }

  handlePasswordChange(event) {
    this.setState({ 
        password: event.target.value
     })
  }


  handleSubmit(event) {
    event.preventDefault()
    this.props.dispatch({
      type: 'LOGIN_USER',
      payload: { 
          id: this.state.postId, 
          user: this.state.user, 
          password: this.state.password }
    })

    this.setState({ postId: this.state.postId + 1 })
  }

  render() {
    return (
        <div className="col-6 text-center d-flex justify-content-center">
            <div className="login-div">
                <h3>Log in to Squawk</h3>
                <form onSubmit={this.handleSubmit}>
                    User: <input
                    type="text"
                    value={this.state.user}
                    onChange={this.handleUserChange}
                    /><br></br>
                    Password: <input
                    type="text"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    />
                    <div>
                    <button type="submit" onClick={this.handleSubmit}>
                        Submit
                    </button>
                    </div>
                </form>
                <div>
                    <a><h5>Create New Account</h5></a>
                    {this.props.isLogged ? <h3>You are logged in</h3> : ''}
                </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { posts: state.posts, isLogged: state.isLogged }
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)