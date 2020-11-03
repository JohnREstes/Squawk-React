import { LOAD_FEED, FEED_UPDATED, } from './types'
import axios from 'axios'

export const createFeed = () => dispatch => {
    const JsonWT = localStorage.getItem("JWT");
    const tokenHeader = { headers: {
        'x-auth-token': JsonWT
      }}
    axios.get('http://localhost:5000/api/users/posts', tokenHeader)
    .then(res => dispatch({
            type: LOAD_FEED,
            payload: res.data
        }));
}        
export const createPost = (postData) => dispatch => {
    const JsonWT = localStorage.getItem("JWT");
    const tokenHeader = { headers: {
        'x-auth-token': JsonWT
      }}
    axios.post('http://localhost:5000/api/users/create-post', {
            text: postData.text,
            imageString: postData.imageString
    }, tokenHeader)
    .then(() => dispatch({
      type: FEED_UPDATED
  }));
}

export const editPost = (postData) => dispatch => {
    const JsonWT = localStorage.getItem("JWT");
    const tokenHeader = { headers: {
        'x-auth-token': JsonWT
      }}
    axios.put('http://localhost:5000/api/users/edit-post', {
            postId: postData.postId,
            newText: postData.newText
    }, tokenHeader)
    .then(() => dispatch({
      type: FEED_UPDATED
  }));
}

export const deletePost = (postData) => dispatch => {
    const JsonWT = localStorage.getItem("JWT");
    const config = {
      method: 'delete',
      url: 'http://localhost:5000/api/users/delete-post',
      data: { postId: postData.postId },
      headers: { 'x-auth-token': JsonWT }
    }
    axios(config)
    .then(() => dispatch({
      type: FEED_UPDATED
  }));
}

export const likePost = (likeData) => dispatch => {
  const JsonWT = localStorage.getItem("JWT");
  const tokenHeader = { headers: {
      'x-auth-token': JsonWT
    }}
  axios.put('http://localhost:5000/api/users/like-post', {
          author: likeData.author,
          postId: likeData.postId
  }, tokenHeader)
  .then(() => dispatch({
    type: FEED_UPDATED
}));
}
export const feedToggle = () => dispatch => {
  dispatch({
      type: FEED_UPDATED
  });
};