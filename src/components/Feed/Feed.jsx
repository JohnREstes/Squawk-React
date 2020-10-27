import React from 'react'
import '../../App.css'
import { connect } from 'react-redux'

class Feed extends React.Component {

  createImage(){
    const userImage = "data:image/png;base64," + this.props.base64TextString;
    console.log(userImage);
    const preview = document.getElementById('profile-pic');
    preview.src = userImage;
  }

  componentDidMount(){
    this.createImage();
  }

  render(){
  return (
        <div className="col-6 text-center center">
          <div className="row">
          <div className="span9 centred"> 
            <img id="profile-pic" alt="User uploaded for profile"/><br></br>
          </div>
            <div className="col-12">
                <h1>Feed:</h1>
                {this.props.feed.feed.map(x => (
                    <p key={x.id}>{x.title}</p>
                ))}
            </div>
          </div>
        </div>
  );
}
}

const mapStateToProps = (state) => {
  return { base64TextString: state.user.info.profilePicture, feed: state.feed }
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)