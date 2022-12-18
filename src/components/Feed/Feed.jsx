import React from 'react'
import { createPost, createFeed, likePost, editPost, deletePost, stateToggle } from '../../actions/feedActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import $ from 'jquery'
import { loadFlockProfiles, loadFlockList } from '../../actions/flockListActions'

class Feed extends React.Component {
  constructor() {
    super()
    this.state = {
      postText: '',
      postImage: '',
      editText: '',
      stateToggle: false
    }
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount(){
    this.props.createFeed();
    this.props.loadFlockProfiles();
    this.props.loadFlockList();
  }

  componentDidUpdate(){
    if(this.props.stateUpdated){
      this.props.createFeed();

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
        [e.target.name]: e.target.value
     })
  }

  handlePictureChange(event){
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
          postImage: btoa(binaryString)
      })
  }

  onSubmit(e) {
    e.preventDefault();
      const newPost = { 
        text: this.state.postText,
        imageString: this.state.postImage
      }
      this.props.createPost(newPost);
      $('#postText').val('');
  }  

  calculateTime(postTime){
    var dateFromAPI = postTime;
    var now = new Date();
    var datefromAPITimeStamp = (new Date(dateFromAPI)).getTime();
    var nowTimeStamp = now.getTime();
    var microSecondsDiff = Math.abs(datefromAPITimeStamp - nowTimeStamp );
    // Number of milliseconds per day =
    //   24 hrs/day * 60 minutes/hour * 60 seconds/minute * 1000 msecs/second
    var daysDiff = (Math.floor(microSecondsDiff/(1000 * 24 * 60 * 60)));
    var hoursDiff = Math.floor(microSecondsDiff/(1000 * 60 * 60)) - (daysDiff * 24);
    var minutesDiff = (Math.floor(microSecondsDiff/(1000 * 60)) - (daysDiff * 60 * 24) - (hoursDiff * 60));
    daysDiff = daysDiff + " days "
    hoursDiff = hoursDiff + " hours "
    minutesDiff = minutesDiff + " minutes ago"
    var timeDiff = daysDiff + hoursDiff + minutesDiff
    return timeDiff
  }

  checkAuthor(author, notAuthor){
    var currentAuthorPicture = "";
    if (notAuthor){
      for(let j = 0; j < this.props.friendsProfilePicture.length; j++){
        if(this.props.friendsProfilePicture[j].username === author){
          if(this.props.friendsProfilePicture[j].profilePicture === ''){
            currentAuthorPicture = (<img src={this.props.birdLink} className="profile-pic" alt="other user"/>);
          }else{
            currentAuthorPicture = (<img className="profile-pic" alt="profile" src={`data:image/png;base64,${this.props.friendsProfilePicture[j].profilePicture}`}/>);
          }} 
      }
    }else{
      currentAuthorPicture = (<img className="profile-pic" alt="profile" src={`data:image/png;base64,${this.props.base64TextString}`}/>)
    }
    return currentAuthorPicture;
  }

  likePost(author, _id){
      const likePost = { 
        author: author,
        postId: _id
      }
    this.props.likePost(likePost);
  }

  changeToEdit(_id){
    const inputId = "#input" + _id;
    const textId = "#text" + _id; 
    const buttonId = "#button" + _id;
    $( inputId ).css('display', 'initial');
    $( buttonId ).css('display', 'initial');
    $( textId ).css('display', 'none');
  }

  closeChangeToEdit(_id){
    const inputId = "#input" + _id;
    const textId = "#text" + _id; 
    const buttonId = "#button" + _id;
    $( inputId ).css('display', 'none');
    $( buttonId ).css('display', 'none');
    $( textId ).css('display', 'initial');
  }

  editPost(_id){
    const editPost = { 
      postId: _id,
      newText: this.state.editText
    }
    this.props.editPost(editPost);
    this.closeChangeToEdit(_id);
  }

  deletePost(_id){
    const delPost = { 
      postId: _id
    }
    this.props.deletePost(delPost);
    this.props.createFeed();
  }


  buildFeed(){
    const username = this.props.username;
    const posts = this.props.feed.feed.postsToDisplay;
    let wholeFeed = [];
    for(let i = 0; i < posts.length; i++){
      const _id = posts[i]._id;
      const inputId = "input" + _id;
      const textId = "text" + _id;
      const buttonId = "button" + _id; 
      const author = posts[i].author;
      const likes = posts[i].likes.length;
      const postTime = posts[i].postTime;
      const text = posts[i].text;
      const imageString = posts[i].imageString;
      const notAuthor = (username !== author);
      let post = (
      <div className="card" key={_id}>
        <div className="card-header">
          <div className="row">
              <div className="col-2 feed-top-row">
                {this.checkAuthor(author, notAuthor)}
              </div>
              <div className="col-7">
                {author}<br></br>  
                {this.calculateTime(postTime)}<br></br>
                {likes} <img src={require('../../images/like.png')} className="feed-icons"
                onClick={(e) => this.likePost(author, _id)}
                alt="profile"
                ></img><br></br>
              </div>
              {notAuthor ? <div className="col-3"></div> : (
                <div className="col-2">
                <img src={require('../../images/pencil.png')} className="feed-icons"
                  onClick={(e) => this.changeToEdit(_id)}
                  alt="profile"
                  ></img>
                  <img src={require('../../images/trash.png')} className="feed-icons"
                  onClick={(e) => this.deletePost(_id)}
                  alt="profile"
                  ></img><br></br>
                  <button className="hidden" id={buttonId}
                  onClick={(e) => this.editPost(_id)}
                  >Submit Changes</button>
                </div>
              )}
            </div>
        </div>
        <div className="card-body">
          <div className="col-12">
            <div className="row feed-div">
              <div className="col-8 d-flex justify-content-center center-text">
                <p id={textId}>{text}</p>
                <input type="text" className="hidden inputBox" 
                name="editText" 
                placeholder={text}
                id={inputId}
                value={this.state.editText}
                onChange={(e) => this.onChange(e)}
                ></input>
              </div>
              <div className="col-4 move-left">
                {imageString ? <img className="posted-pic" alt="Feed" src={`data:image/png;base64,${imageString}`}/>: ''}
              </div>
            </div>
          </div>
        </div>
      </div>
      );
      wholeFeed.push(post);
    }  
    return (
      <>{wholeFeed}</>
    )
  }  

  render(){
    const isLoading = (this.props.feed.feed === "");
    return (isLoading ? <div className="col-6 center"><h1>Loading...</h1></div> : (
        <div className="col-6 center">
          <div className="row">
            <div className="col-12 justiy-content-center">
                <h1 className="text-center">Feed:</h1>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <p>Post Text:</p> 
                    <input
                    type="text" name="postText" id="postText"
                    className="inputBox"
                    value={this.state.user}
                    onChange={(e) => this.onChange(e)}
                    /><br></br>
                    <input
                        type="file"
                        name="postImage"
                        id="file"
                        accept=".jpeg, .png, .jpg"
                        onChange={(e) => this.handlePictureChange(e)}
                    />
                    <button type="submit" className="bouncy">
                        Submit
                    </button>
                </form><br></br>
                {this.buildFeed()}
            </div>
          </div>
        </div>
  ))
}}

const mapStateToProps = (state) => {
  return {  base64TextString: state.user.info.profilePicture, 
            feed: state.feed,
            username: state.user.info.username,
            stateUpdated: state.stateUpdated,
            birdLink: state.birdFact.link,
            profilePicture: state.user.info.profilePicture,
            friendsProfilePicture: state.friendsAndStatus.friendsProfiles.allFriendsProfiles
          }
}

const mapDispatchToProps = dispatch => {
  return {    
    createPost: data => dispatch(createPost(data)),
    createFeed: () => dispatch(createFeed()),
    likePost: data => dispatch(likePost(data)),
    editPost: data => dispatch(editPost(data)),
    deletePost: data => dispatch(deletePost(data)),
    stateToggle: () => dispatch(stateToggle()),
    loadFlockProfiles: () => dispatch(loadFlockProfiles()),
    loadFlockList: () => dispatch(loadFlockList())
  }
}

Feed.propTypes = {
  createPost: PropTypes.func.isRequired,
  createFeed: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  stateToggle:  PropTypes.func.isRequired,
  loadFlockProfiles:  PropTypes.func.isRequired,
  loadFlockList:  PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)
