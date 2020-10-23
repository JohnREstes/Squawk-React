import React from 'react'
import '../../App.css'
import { connect } from 'react-redux'
import { createAccount, createNewUser, createFeed } from '../../actions/userActions'
import PropTypes from 'prop-types'

class Login extends React.Component {
  
  componentDidMount(){
    this.props.createFeed();
  }

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

  handleCreateUser(){
    this.props.createNewUser();
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
                    <button onCLick={this.handleCreateUser}>Create New Account</button>
                    <p>{this.props.pageDisplayed}</p>
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

const mapStateToProps = (state) => ({
  pageDisplayed: state.pageDisplayed.type 
})

export default connect(
  mapStateToProps,
  {
  createFeed,
  createAccount,
  createNewUser
})
(Login);