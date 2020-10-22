import React from 'react'
import '../../App.css'
import { connect } from 'react-redux'
import $ from 'jquery'

class newUser extends React.Component {
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
      console.log('Password Mismatch');
      $("#passwordMismatch").css('display', 'inline');
    }else{
      const newUser = { 
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      }
      const preview = document.getElementById('profile-picture');
      //console.log("binary string: ", this.state.base64TextString)

      let payload = {image: this.state.base64TextString}
      preview.src = "data:image/png;base64," + this.state.base64TextString
    }
  }

  onFileSubmit = (e) => {
      e.preventDefault();

    }

  render() {
    return (
        <div className="col-6">
            <div className="login-div">
                <h3 className="text-center">Log in to Squawk</h3>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    User: <input
                    type="text" name="username"
                    value={this.state.username}
                    onChange={(e) => this.onChange(e)}
                    /><br></br>
                    Email: <input
                    type="email" name="email"
                    value={this.state.email}
                    onChange={(e) => this.onChange(e)}
                    /><br></br>
                    Password: <input
                    type="password" name="password"
                    value={this.state.password}
                    onChange={(e) => this.onChange(e)}
                    /><br></br>
                    Re-enter Password: <input
                    type="password" name="passwordVerify"
                    value={this.state.passwordVerify}
                    onChange={(e) => this.onChange(e)}
                    /><br></br>
                    <p id="passwordMismatch" className="hidden red">Passwords do not match!</p>
                    <br></br>
                    <button type="submit">
                        Submit
                    </button>
                </form><br></br>

                <div>
                    <a><h5>Create New Account</h5></a>
                    {this.props.isLogged ? <h3>You are logged in</h3> : ''}
                      <img id="profile-picture"/>
                      <p>{this.state.username}</p>
                      <p>{this.state.email}</p>
                      <p>{this.state.password}</p>
                      <p>{this.state.passwordVerify}</p>
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
)(newUser)