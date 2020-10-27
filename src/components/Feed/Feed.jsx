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
            <div className="col-12 justiy-content-center feed-div">
                <h1>Feed:</h1>
                {this.props.feed.feed.map(x => (
                    <p key={x.id}>
                    {this.props.base64TextString ? <img class="profile-pic" src={`data:image/png;base64,${this.props.base64TextString}`}/>: ''}
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
  return { base64TextString: state.user.info.profilePicture, feed: state.feed }
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)