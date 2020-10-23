import React from 'react'
import '../../App.css'
import { connect } from 'react-redux'
import { createAccount, createNewUser } from '../../actions/userActions'
import { createFeed } from '../../actions/userActions'
import PropTypes from 'prop-types'

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

  componentDidMount(){
    this.props.createFeed();
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
    const login = {
      type: 'LOGIN_USER',
      payload: {  
          user: this.state.user, 
          password: this.state.password }
    }

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
                    <button>Create New Account</button>
                </div>
            </div>
        </div>
    )
  }
}

Login.propTypes = {
  createAccount: PropTypes.func.isRequired,
  createNewUser: PropTypes.func.isRequired,
  createFeed: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return { posts: state.posts }
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
}

export default connect(null,
  mapStateToProps,
  mapDispatchToProps,
  createFeed,
  createAccount,
  createNewUser
)(Login)