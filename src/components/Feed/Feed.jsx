import React from 'react'
import { createPost } from '../../actions/feedActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Feed extends React.Component {
  constructor() {
    super()
    this.state = {
      postText: '',
      postImage: ''
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
  }  

  buildFeed(){
    const feed = this.props.feed.feed.postsToDisplay.map(feed => {
      const { author, likes, postTime, text, imageString } = feed
    return (
        <p className="feed-div" key={postTime}>
        {this.props.base64TextString ? <img className="profile-pic" alt="profile" src={`data:image/png;base64,${this.props.base64TextString}`}/>: ''}
        {author}
          <br></br>
          {text}
          {imageString ? <img className="profile-pic" alt="Feed" src={`data:image/png;base64,${imageString}`}/>: ''}
          </p>
    )})
      return (<>{feed}</>)
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
    createPost: post => dispatch(createPost(post))

  }
}

Feed.propTypes = {
  createPost: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)