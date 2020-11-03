import React from 'react'
import '../../App.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { editUserProfile, getSquawkUser } from '../../actions/userActions'
import { feedToggle } from '../../actions/feedActions'
import $ from 'jquery'

class EditUser extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      passwordRetype: '',
      emailAddress: '',
      birdCall: '',
      profilePicture: '',
      aboutMe: '',
      myBirds: '',
      birdsIWatch:'',
      base64TextString: '',
      feedToggle: false
    }
    this.onChange = this.onChange.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
  }

  componentDidUpdate(){
    if(this.props.feedUpdated){
      this.props.getSquawkUser();

      this.setState({
        feedToggle: this.props.feedUpdated
      })
      this.props.feedToggle();
      this.setState({
        feedToggle: this.props.feedUpdated
      })
    }
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
    if(propertyToModify === "profilePicture"){
        updatedUserInfo = {
            [propertyToModify]: this.state.base64TextString
        }
        // const preview = document.getElementById('profile-pic');
        // preview.src = "data:image/png;base64," + this.state.base64TextString
    }else if (propertyToModify === "password"){
        if(this.state.password !== this.state.passwordRetype){
            $("#passwordMismatch").css('display', 'inline');
        }
    }else{
        updatedUserInfo =
        { 
            [propertyToModify]: this.state[propertyToModify]
        }
    }
    this.props.editUserProfile(updatedUserInfo);
    this.setState({
        [propertyToModify]: ''
    })
    $(`#${propertyToModify}`).val('')
  }
 

  render() {
    return (
        <div className="col-6">
            <div className="login-div">
                <h3 className="text-center">Edit User</h3>
                <form onSubmit={(e) => this.onSubmit(e, "username")}>
                    Username: <input
                    type="text" name="username" id="username"
                    value={this.state.username}
                    placeholder={this.props.username}
                    onChange={(e) => this.onChange(e)}/>
                     <button type="submit">
                        Submit
                    </button>
                </form>
                    <br></br>
                <form onSubmit={(e) => this.onSubmit(e, "password")}>
                    Password: <input
                    type="password" name="password" id="password"
                    value={this.state.password}
                    onChange={(e) => this.onChange(e)}/><br></br>
                    Re-enter Password: <input
                    type="password" name="passwordRetype" id="passwordRetype"
                    value={this.state.passwordRetype}
                    onChange={(e) => this.onChange(e)}/>
                    <button type="submit">
                        Submit
                    </button>
                    <p id="passwordMismatch" className="hidden red">Passwords do not match!</p>
                </form>
                    <br></br>
                <form onSubmit={(e) => this.onSubmit(e, "emailAddress")}>
                    Email: <input
                    type="email" name="emailAddress" id="emailAddress"
                    value={this.state.emailAddress}
                    placeholder={this.props.emailAddress}
                    onChange={(e) => this.onChange(e)}/>
                    <button type="submit">
                        Submit
                    </button>
                </form>
                    <br></br>
                <form onSubmit={(e) => this.onSubmit(e, "aboutMe")}>
                    About me: <textarea
                    type="text" name="aboutMe" id="aboutMe"
                    value={this.state.aboutMe}
                    placeholder={this.props.aboutMe}
                    onChange={(e) => this.onChange(e)}/>
                    <button type="submit">
                        Submit
                    </button>
                </form>
                    <br></br>
                <form onSubmit={(e) => this.onSubmit(e, "birdCall")}>
                    Bird Call: <textarea
                    type="text" name="birdCall" id="birdCall"
                    value={this.state.birdCall}
                    placeholder={this.props.birdCall}
                    onChange={(e) => this.onChange(e)}/>
                    <button type="submit">
                        Submit
                    </button>
                </form>    
                    <br></br>
                    <div><br></br>
                <form onSubmit={(e) => this.onSubmit(e, "profilePicture")}>                                    
                    <input
                        type="file"
                        name="profilePicture"
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
                <p>Current Profile Picture: <img className="profile-pic" alt="profile" src={`data:image/png;base64,${this.props.profilePicture}`}/></p>
            </div>
        </div>
       

         
        
     
    );
  }
}
const mapDispatchToProps = dispatch => {
    return {    
      editUserProfile: data => dispatch(editUserProfile(data)),
      getSquawkUser: () => dispatch(getSquawkUser()),
      feedToggle: () => dispatch(feedToggle()),
    }
  }

const mapStateToProps = (state) => {
    return {  
        username: state.user.info.username,
        emailAddress: state.user.info.emailAddress,
        birdCall: state.user.info.birdCall,
        profilePicture: state.user.info.profilePicture,
        aboutMe: state.user.info.aboutMe,
        myBirds: state.user.info.myBirds,
        birdsIWatch: state.user.info.birdsIWatch,
        feedUpdated: state.feedUpdated
    }
}

EditUser.propTypes = {
    editUserProfile: PropTypes.func.isRequired,
    getSquawkUser:  PropTypes.func.isRequired,
    feedToggle:  PropTypes.func.isRequired
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditUser);