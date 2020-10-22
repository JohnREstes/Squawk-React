import React from 'react'
import '../../App.css'
import { connect } from 'react-redux'
import ImageUploader from 'react-images-upload';

class newUser extends React.Component {
  constructor() {
    super()
    this.state = {
      user: '',
      password: '',
      email: '',
      birdCall: '',
      picture: '',
      aboutMe: '',
      myBirds: '',
      birdsIWatch:'',
      base64TextString: '',
      pictures: [] 
    }

    this.handleUserChange = this.handleUserChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleBirdCallChange = this.handleBirdCallChange.bind(this)
    this.handlePictureChange = this.handlePictureChange.bind(this)
    this.handleAboutMeChange = this.handleAboutMeChange.bind(this)
    this.handleMyBirdsChange = this.handleMyBirdsChange.bind(this)
    this.handleBirdsIWatchChange = this.handleBirdsIWatchChange.bind(this)
  }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//       .then(response => response.json())
//       .then(json => {
//         this.props.dispatch({
//           type: 'LOAD_POSTS',
//           payload: json
//         })
//       })
//   }

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

  handleEmailChange(event) {
    this.setState({ 
        email: event.target.value
     })
  }

  handleBirdCallChange(event) {
    this.setState({ 
        birdCall: event.target.value
     })
  }

  handlePictureChange(event) {
    this.setState({ 
        picture: event.target.value
     })
  }

  handleAboutMeChange(event) {
    this.setState({ 
        aboutMe: event.target.value
     })
  }

  handleMyBirdsChange(event) {
    this.setState({ 
        myBirds: event.target.value
     })
  }

  handleBirdsIWatchChange(event) {
    this.setState({ 
        birdsIWatch: event.target.value
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch({
      type: 'NEW_USER',
      payload: { 
        user: this.state.user,
        password: this.state.password,
        email: this.state.email,
        birdCall: this.state.birdCall,
        picture: this.state.base64,
        aboutMe: this.state.aboutMe,
        myBirds: this.state.myBirds,
        birdsIWatch:this.state.birdsIWatch 
        }
    })
  }

  onFileSubmit = (e) => {
      e.preventDefault();
      const preview = document.getElementById('profile-picture');
      console.log("binary string: ", this.state.base64TextString)

      let payload = {image: this.state.base64TextString}
      preview.src = "data:image/png;base64," + this.state.base64TextString
    }

  render() {
    console.log(this.state.pictures)
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
                <form onSubmit={(event) => this.onFileSubmit(event)} onChange={(event) => this.handlePictureChange(event)}>
                    <input
                        type="file"
                        name="image"
                        id="file"
                        accept=".jpeg, .png, .jpg"
                    />
                    <input type="submit"/>
                </form>

                <div>
                    <a><h5>Create New Account</h5></a>
                    {this.props.isLogged ? <h3>You are logged in</h3> : ''}
                    <img id="profile-picture"/>
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