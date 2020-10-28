import React from 'react'
import '../../App.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { editUserProfile } from '../../actions/userActions'

class newUser extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      emailAddress: '',
      birdCall: '',
      picture: '',
      aboutMe: '',
      myBirds: '',
      birdsIWatch:'',
      base64TextString: ''
    }

    this.onChange = this.onChange.bind(this)
    this.handlePictureChange = this.handlePictureChange.bind(this)
  }

  onChange(e) {
    this.setState({ 
        [e.target.name]: e.target.value
     })
  }

  handlePictureChange(event){
      console.log("file to upload: ", event.target.files[0])
      let file = event.target.files[0]
      if (file){
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      }  
    }
    _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result;
        this.setState({
            base64TextString: btoa(binaryString)
        })
    }

  onSubmit(e) {
    e.preventDefault();
    const updatedUser = { 
        userId: this.state,
        username: this.state.username,
        password: this.state.password,
        emailAddress: this.state.emailAddress,
        birdCall: this.state.birdCall,
        aboutMe: this.state.aboutMe,
        myBirds: this.state.myBirds,
        birdsIWatch:this.state.birdsIWatch,
        base64TextString: this.state.base64TextString
    }
    this.props.editUserProfile(updatedUser);
    //take this new user and send it to the right function call
    const preview = document.getElementById('profile-picture');
    console.log("binary string: ", this.state.base64TextString)

    preview.src = "data:image/png;base64," + this.state.base64TextString
  }

  onFileSubmit = (e) => {
      e.preventDefault();

    }
//create a form for each of the values.  function to handle the submit more solid
//for multiple uses i.e. each of the values not needing their own call
//also, need to create an edit button that reveals a submit and cancel button for each of the forms.
  render() {
    return (
        <div className="col-6">
            <div className="login-div">
                <h3 className="text-center">Edit User</h3>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    User: <input
                    type="text" name="user"
                    value={this.state.username}
                    onChange={(e) => this.onChange(e)}
                    /><br></br>
                    Password: <input
                    type="password" name="password"
                    value={this.state.password}
                    onChange={(e) => this.onChange(e)}
                    /><br></br>
                    Email: <input
                    type="email" name="email"
                    value={this.state.emailAddress}
                    onChange={(e) => this.onChange(e)}
                    /><br></br>
                    About me: <textarea
                    type="text" name="aboutMe"
                    value={this.state.aboutMe}
                    onChange={(e) => this.onChange(e)}
                    /><br></br>
                    Bird Call: <textarea
                    type="text" name="birdCall"
                    value={this.state.birdCall}
                    onChange={(e) => this.onChange(e)}
                    /><br></br>
                    My Birds: <textarea
                    type="text" name="myBirds"
                    value={this.state.myBirds}
                    onChange={(e) => this.onChange(e)}
                    />     <br></br>
                    Birds I Watch: <textarea
                    type="text" name="birdsIWatch"
                    value={this.state.birdsIWatch}
                    onChange={(e) => this.onChange(e)}
                    />     <br></br>                                
                    <div><br></br>
                    <input
                        type="file"
                        name="image"
                        id="file"
                        accept=".jpeg, .png, .jpg"
                        onChange={(e) => this.handlePictureChange(e)}
                    />
                    <button type="submit">
                        Submit
                    </button>
                    </div>
                </form><br></br>

                <div>
                      <img id="profile-picture" alt="User uploaded for profile"/>
                      <p>{this.state.username}</p>
                      <p>{this.state.password}</p>
                      <p>{this.state.emailAddress}</p>
                      <p>{this.state.birdCall}</p>
                      <p>{this.state.aboutMe}</p>
                      <p>{this.state.myBirds}</p>
                      <p>{this.state.birdsIWatch}</p>
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