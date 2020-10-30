import React from 'react'
import '../../App.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { editUserProfile } from '../../actions/userActions'

class EditUser extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      emailAddress: '',
      birdCall: '',
      image: '',
      aboutMe: '',
      myBirds: '',
      birdsIWatch:'',
      base64TextString: ''
    }


    this.onChange = this.onChange.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handlePictureChange(event) {
    console.log("file to upload: ", event.target.files[0]);
    let file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    this.setState({
      base64TextString: btoa(binaryString),
    });
  };

  onSubmit(e, propertyToModify) {
    e.preventDefault();

    
    var updatedUserInfo;
    if(propertyToModify === "image"){
        updatedUserInfo = {
            [propertyToModify]: this.state.base64TextString
        }
    }else{
        updatedUserInfo =
        { 
            [propertyToModify]: this.state[propertyToModify]
        }
    }
    this.props.editUserProfile(updatedUserInfo);
   
    const preview = document.getElementById('profile-picture');
    preview.src = "data:image/png;base64," + this.state.base64TextString
  }
 

  render() {
    return (
        <div className="col-6">
            <div className="login-div">
                <h3 className="text-center">Edit User</h3>
                <form onSubmit={(e) => this.onSubmit(e, "username")}>
                    Username: <input
                    type="text" name="username"
                    value={this.state.username}
                    onChange={(e) => this.onChange(e)}/>
                     <button type="submit">
                        Submit
                    </button>
                </form>
                    <br></br>
                <form onSubmit={(e) => this.onSubmit(e, "password")}>
                    Password: <input
                    type="password" name="password"
                    value={this.state.password}
                    onChange={(e) => this.onChange(e)}/>
                    <button type="submit">
                        Submit
                    </button>
                </form>
                    <br></br>
                <form onSubmit={(e) => this.onSubmit(e, "emailAddress")}>
                    Email: <input
                    type="email" name="emailAddress"
                    value={this.state.emailAddress}
                    onChange={(e) => this.onChange(e)}/>
                    <button type="submit">
                        Submit
                    </button>
                </form>
                    <br></br>
                <form onSubmit={(e) => this.onSubmit(e, "aboutMe")}>
                    About me: <textarea
                    type="text" name="aboutMe"
                    value={this.state.aboutMe}
                    onChange={(e) => this.onChange(e)}/>
                    <button type="submit">
                        Submit
                    </button>
                </form>
                    <br></br>
                <form onSubmit={(e) => this.onSubmit(e, "birdCall")}>
                    Bird Call: <textarea
                    type="text" name="birdCall"
                    value={this.state.birdCall}
                    onChange={(e) => this.onChange(e)}/>
                    <button type="submit">
                        Submit
                    </button>
                </form>    
                    <br></br>
                <form onSubmit={(e) => this.onSubmit(e, "myBirds")}>    
                    My Birds: <textarea
                    type="text" name="myBirds"
                    value={this.state.myBirds}
                    onChange={(e) => this.onChange(e)}/>
                    <button type="submit">
                        Submit
                    </button>
                </form>
                     <br></br>
                <form onSubmit={(e) => this.onSubmit(e, "birdsIWatch")}>
                    Birds I Watch: <textarea
                    type="text" name="birdsIWatch"
                    value={this.state.birdsIWatch}
                    onChange={(e) => this.onChange(e)}/>
                    <button type="submit">
                        Submit
                    </button>
                </form>
                    <br></br>
                    <div><br></br>
                <form onSubmit={(e) => this.onSubmit(e, "image")}>                                    
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
                  </form>  
                    </div>
                <br></br>

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
       

         
        
     
    );
  }
}

EditUser.propTypes = {
    editUserProfile: PropTypes.func.isRequired
};

export default connect (null,{
    editUserProfile
})(EditUser);