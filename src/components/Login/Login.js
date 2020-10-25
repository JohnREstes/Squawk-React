import React, { Component } from 'react'
import '../../App.css'
import { connect } from 'react-redux'
import { createFeed, createAccount, loginSquawkUser} from '../../actions/userActions'
import { createBirdFact, createBirdImage } from '../../actions/birdActions'
import { LOGIN_SQUAWK_USER } from '../../actions/types'
import PropTypes from 'prop-types'

class Login extends Component {
  
  componentDidMount(){
    this.props.createFeed();
    this.props.createBirdImage();
    this.props.createBirdFact();
  }

  constructor() {
    super()
    this.state = {
      usernameOrEmailAddress: '',
      password: ''
    }

    this.handleUserChange = this.handleUserChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleUserChange(event) {
    this.setState({ 
      usernameOrEmailAddress: event.target.value
     })
  }

  handlePasswordChange(event) {
    this.setState({ 
        password: event.target.value
     })
  }

  handleCreateUser(){
    console.log("button clicked")
    this.props.createAccount();
  }

  handleSubmit(event) {
    console.log("clicked submit")
    event.preventDefault()
    const login = {  
          usernameOrEmailAddress: this.state.usernameOrEmailAddress, 
          password: this.state.password 
    }
    this.props.loginSquawkUser(login);
  }

  render() {
    return (
        <div className="col-6 text-center d-flex justify-content-center">
            <div className="login-div">
                <h3>Log in to Squawk</h3>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input
                    placeholder="Username or Password"
                    type="text"
                    value={this.state.usernameOrEmailAddress}
                    onChange={this.handleUserChange}
                    /><br></br>
                    <input
                    placeholder="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    />
                    <div>
                    <button type="submit">
                        Submit
                    </button>
                    </div>
                </form>
                <div>
                    <button onClick={() => this.handleCreateUser()}>Create New Account</button><br></br>
                    
                    <p className="hidden" id="invalid">Username or Password is incorrect!</p>
                </div>
            </div>
        </div>
    )
  }
}

Login.propTypes = {
  createAccount: PropTypes.func.isRequired,
  loginSquawkUser: PropTypes.func.isRequired,
  createFeed: PropTypes.func.isRequired, 
  createBirdFact: PropTypes.func.isRequired, 
  createBirdImage:  PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  pageDisplayed: state.pageDisplayed.type 
})

export default connect(
  mapStateToProps,
  {
  createAccount,
  loginSquawkUser,
  createFeed,
  createBirdFact,
  createBirdImage
})
(Login);