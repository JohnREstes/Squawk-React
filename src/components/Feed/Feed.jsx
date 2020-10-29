import React from 'react'
import { createPost, createFeed, likePost, editPost } from '../../actions/feedActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import $ from 'jquery'

class Feed extends React.Component {
  constructor() {
    super()
    this.state = {
      postText: '',
      postImage: '',
      editText: ''
    }
    this.onChange = this.onChange.bind(this)
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
      this.props.createFeed();
  }  

  calculateTime(postTime){
    var dateFromAPI = postTime;
    var now = new Date();
    var datefromAPITimeStamp = (new Date(dateFromAPI)).getTime();
    var nowTimeStamp = now.getTime();
    var microSecondsDiff = Math.abs(datefromAPITimeStamp - nowTimeStamp );
    // Number of milliseconds per day =
    //   24 hrs/day * 60 minutes/hour * 60 seconds/minute * 1000 msecs/second
    var hoursDiff = Math.floor(microSecondsDiff/(1000 * 60 * 24));
    var minutesDiff = (Math.floor(microSecondsDiff/(1000 * 24)) - ( hoursDiff * 60));

    hoursDiff = hoursDiff + " hours "
    minutesDiff = minutesDiff + " minutes ago"
    var timeDiff = hoursDiff + minutesDiff
    return timeDiff
  }

  likePost(author, _id){
      const likePost = { 
        author: author,
        postId: _id
      }
      this.props.likePost(likePost);
      this.props.createFeed();
  }

  changeToEdit(_id){
    const inputId = "#input" + _id;
    const textId = "#text" + _id; 
    const buttonId = "#button" + _id;
    $( inputId ).css('display', 'initial');
    $( buttonId ).css('display', 'initial');
    $( textId ).css('display', 'none');
  }

  editPost(_id){
    const editPost = { 
      postId: _id,
      newText: this.state.editText
    }
    console.log(editPost)
    this.props.editPost(editPost);
    this.props.createFeed();
}

  buildFeed(){
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
      let post = (
      <div className="col-12 feed-div-box" key={_id} style={{border: '1px solid black'}}>
        <div className="row">
          <div className="col-12">
            <div className="row ">
              <div className="col-2 feed-top-row">
                {this.props.base64TextString ? <img className="profile-pic" alt="profile" src={`data:image/png;base64,${this.props.base64TextString}`}/>: ''}
              </div>
              <div className="col-8">
                {author}<br></br>  
                {this.calculateTime(postTime)}<br></br>
                {likes} <img src={require('../../images/like.png')} className="feed-icons"
                onClick={(e) => this.likePost(author, _id)}
                ></img><br></br>
              </div>
              <div className="col-2">
              <img src={require('../../images/pencil.png')} className="feed-icons"
                onClick={(e) => this.changeToEdit(_id)}
                ></img>
                <img src={require('../../images/trash.png')} className="feed-icons"
                onClick={() => this.deletePost(author, _id)}
                ></img><br></br>
                <button className="hidden" id={buttonId}
                onClick={(e) => this.editPost(_id)}
                >Submit Changes</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 post-div">
            <div className="row feed-div">
              <div className="col-8 d-flex justify-content-center center-text">
                <p id={textId}>{text}</p>
                <input type="text" className="hidden" 
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
    return (!this.props.base64TextString ? 
      <div className="col-6 text-center center">
        <h1 id="loading">Loading...</h1>
        </div> : (
        <div className="col-6 center">
          <div className="row">
            <div className="col-12 justiy-content-center">
                <h1 className="text-center">Feed:</h1>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    Post Text: <input
                    type="text" name="postText"
                    id="postText"
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
                    <button type="submit">
                        Submit
                    </button>
                </form><br></br>
                {this.buildFeed()}
            </div>
          </div>
        </div>
  ));
}}

const mapStateToProps = (state) => {
  return {  base64TextString: state.user.info.profilePicture, 
            feed: state.feed,
            username: state.user.info.username
          }
}

const mapDispatchToProps = dispatch => {
  return {    
    createPost: post => dispatch(createPost(post)),
    createFeed: () => dispatch(createFeed()),
    likePost: like => dispatch(likePost(like)),
    editPost: edit => dispatch(editPost(edit))

  }
}

Feed.propTypes = {
  createPost: PropTypes.func.isRequired,
  createFeed: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)