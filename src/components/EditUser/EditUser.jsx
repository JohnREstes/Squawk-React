import React from 'react'
import '../../App.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { editUserProfile, getSquawkUser } from '../../actions/userActions'
import { stateToggle  } from '../../actions/feedActions'
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
      stateToggle: false
    }
    this.onChange = this.onChange.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
  }

  componentDidUpdate(){
    if(this.props.stateUpdated){
      this.props.getSquawkUser();

      this.setState({
        stateToggle: this.props.stateUpdated
      })
      this.props.stateToggle();
      this.setState({
        stateToggle: this.props.stateUpdated
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
        <div className="col-6 center">
            <div className="login-div">
                <div className="card">
                    <div className="card-header">
                    <h3 className="text-center">Edit User</h3>
                    </div>
                    <div className="card-body">
                    <form onSubmit={(e) => this.onSubmit(e, "username")}>
                        <p>Username:</p>
                        <input
                        type="text" name="username" id="username"
                        value={this.state.username}
                        placeholder={this.props.username}
                        onChange={(e) => this.onChange(e)}/>
                         <br></br>
                        <button type="submit">
                            Submit
                        </button>
                    </form>                    
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                    <form onSubmit={(e) => this.onSubmit(e, "password")}>
                        <p>Password:</p> 
                        <input
                        type="password" name="password" id="password"
                        value={this.state.password}
                        onChange={(e) => this.onChange(e)}/>
                        <p></p>
                        <p>Re-enter Password:</p> 
                        <input
                        type="password" name="passwordRetype" id="passwordRetype"
                        value={this.state.passwordRetype}
                        onChange={(e) => this.onChange(e)}/>
                         <br></br>                       
                        <button type="submit">
                            Submit
                        </button>
                        <p id="passwordMismatch" className="hidden red">Passwords do not match!</p>
                    </form>                    
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                    <form onSubmit={(e) => this.onSubmit(e, "emailAddress")}>
                        <p>Email:</p>
                        <input
                        type="email" name="emailAddress" id="emailAddress"
                        value={this.state.emailAddress}
                        placeholder={this.props.emailAddress}
                        onChange={(e) => this.onChange(e)}/>
                        <br></br>
                        <button type="submit">
                            Submit
                        </button>
                    </form>                    
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                    <form onSubmit={(e) => this.onSubmit(e, "aboutMe")}>
                        <p>About me:</p>
                        <textarea
                        type="text" name="aboutMe" id="aboutMe"
                        value={this.state.aboutMe}
                        placeholder={this.props.aboutMe}
                        onChange={(e) => this.onChange(e)}/>
                        <br></br>
                        <button type="submit">
                            Submit
                        </button>
                    </form>                    
                    </div>
                </div>
          
                <div className="card">
                    <div className="card-body">
                    <form onSubmit={(e) => this.onSubmit(e, "birdCall")}>
                        <p>Bird Call:</p>
                        <textarea
                        type="text" name="birdCall" id="birdCall"
                        value={this.state.birdCall}
                        placeholder={this.props.birdCall}
                        onChange={(e) => this.onChange(e)}/>
                        <br></br>
                        <button type="submit">
                            Submit
                        </button>
                    </form>                      
                    </div>
                </div>  

                <div className="card">
                    <div className="card-body">
                    <form onSubmit={(e) => this.onSubmit(e, "profilePicture")}>                                    
                        <p>Profile Picture:</p>
                        <input
                            type="file"
                            name="profilePicture"
                            id="file"
                            accept=".jpeg, .png, .jpg"
                            onChange={(e) => this.handlePictureChange(e)}
                        />
                        <br></br>
                        <button type="submit">
                            Submit
                        </button>
                    </form>  
                    </div>
                <br></br>
                <p>Current Profile Picture: <img className="profile-pic" alt="profile" src={`data:image/png;base64,${this.props.profilePicture}`}/></p>
                </div>
            </div>
        </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
    return {    
      editUserProfile: data => dispatch(editUserProfile(data)),
      getSquawkUser: () => dispatch(getSquawkUser()),
      stateToggle: () => dispatch(stateToggle()),
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
        stateUpdated: state.stateUpdated
    }
}

EditUser.propTypes = {
    editUserProfile: PropTypes.func.isRequired,
    getSquawkUser:  PropTypes.func.isRequired,
    stateToggle:  PropTypes.func.isRequired
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditUser);