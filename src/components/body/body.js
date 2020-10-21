import React from 'react'
import { connect } from 'react-redux'
import Friends from './friends-bar'

class Body extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
      postId: 2
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.dispatch({
      type: 'ADD_POST',
      payload: { id: this.state.postId, title: this.state.value }
    })

    this.setState({ postId: this.state.postId + 1 })
  }

  render() {
    return(
        <div className="row">
        <div className="col-9">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <div>
              <button type="submit" onClick={this.handleSubmit}>
                Submit
              </button>
            </div>
          </form>
          <ul>
            {this.props.posts.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
              <Friends/>
      </div>
    )
    }
}

    const mapStateToProps = state => {
        return { posts: state.posts }
    }
    
    const mapDispatchToProps = dispatch => {
    return { dispatch }
    }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Body)    