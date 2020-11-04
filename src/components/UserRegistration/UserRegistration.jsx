import React from 'react'
import '../../App.css'
import { connect } from 'react-redux'
import $ from 'jquery'
import { createNewUser, feed, loginToggle } from '../../actions/userActions'
import PropTypes from 'prop-types'

class UserRegistration extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      passwordVerify: '',
      email: '',
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({ 
        [e.target.name]: e.target.value
     })
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state.password !== this.state.passwordVerify){
      $("#passwordMismatch").css('display', 'inline');
    }else{
      const newUserInfo = { 
        username: this.state.username,
        password: this.state.password,
        emailAddress: this.state.email
      }
      this.props.createNewUser(newUserInfo);
alert(`New User ${newUserInfo.username} was created. 

Please log in!`)
      this.props.feed();
    }
  }

  render() {
    return (
        <div className="col-6 center">
            <div className="login-div card">
              <div card-body>
                <h3 className="text-center">Log in to Squawk</h3>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <p>Username:</p> 
                    <input
                    type="text" name="username"
                    value={this.state.username}
                    onChange={(e) => this.onChange(e)}
                    /><br></br>
                    <p>Email: </p>
                    <input
                    type="email" name="email"
                    value={this.state.email}
                    onChange={(e) => this.onChange(e)}
                    /><br></br>
                    <p>Password:</p> 
                    <input
                    type="password" name="password"
                    value={this.state.password}
                    onChange={(e) => this.onChange(e)}
                    /><br></br>
                    <p>Re-enter Password:</p> 
                    <input
                    type="password" name="passwordVerify"
                    value={this.state.passwordVerify}
                    onChange={(e) => this.onChange(e)}
                    /><br></br>
                    <p id="passwordMismatch" className="hidden red">Passwords do not match!</p>
                    <br></br>
                    <button type="submit" className="bouncy">
                        Submit
                    </button>
                </form>
                <button onClick={() => {this.props.feed()}}>Cancel</button>
              </div>
            </div>
        </div>
    )
  }
}

UserRegistration.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  feed: PropTypes.func.isRequired
};


export default connect(null, { 
  createNewUser,
  feed
})(UserRegistration);