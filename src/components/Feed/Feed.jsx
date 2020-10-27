import React from 'react'
import '../../App.css'
import { connect } from 'react-redux'

class Feed extends React.Component {

  // createImage(){
  //   const userImage = "data:image/png;base64," + this.props.base64TextString;
  //   console.log(userImage);
  //   const preview = document.getElementById('profile-pic');
  //   preview.src = userImage;
  // }

  // componentDidMount(){
  //   this.createImage();
  // }

  // componentDidUpdate(){
  //   this.createImage();
  // }

  render(){
    return (!this.props.base64TextString ? 
      <div className="col-6 text-center center">
        <h1 id="loading">Loading...</h1>
        </div> : (
        <div className="col-6 center">
          <div className="row">
            <div className="col-12 justiy-content-center">
                <h1 className="text-center">Feed:</h1>
                {this.props.feed.feed.map(x => (
                    <p className="feed-div" key={x.id}>
                    {this.props.base64TextString ? <img className="profile-pic" src={`data:image/png;base64,${this.props.base64TextString}`}/>: ''}
                    {this.props.username}
                      <br></br>
                      {x.title}</p>
                ))}
            </div>
          </div>
        </div>
  ));
}
}

const mapStateToProps = (state) => {
  return {  base64TextString: state.user.info.profilePicture, 
            feed: state.feed,
            username: state.user.info.username
          }
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)