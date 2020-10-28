import { LOAD_FEED, CREATE_POST, EDIT_POST, DELETE_POST } from './types'
import axios from 'axios'

export const createFeed = () => dispatch => {
    console.log("Get")
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
    console.log("Create")
    const JsonWT = localStorage.getItem("JWT");
    const tokenHeader = { headers: {
        'x-auth-token': JsonWT
      }}
    axios.post('http://localhost:5000/api/users/create-post', {
            text: postData.text,
            imageString: postData.imageString
    }, tokenHeader)

}
export const editPost = (postData) => dispatch => {
    console.log("Edit")
    const JsonWT = localStorage.getItem("JWT");
    const tokenHeader = { headers: {
        'x-auth-token': JsonWT
      }}
    axios.put('http://localhost:5000/api/users/create-post', {
            text: postData.text,
            imageString: postData.imageString
    }, tokenHeader)
    .then(res => dispatch({
        type: EDIT_POST,
        payload: res.data
    }))
}
export const deletePost = (postData) => dispatch => {
    console.log("Delete")
    const JsonWT = localStorage.getItem("JWT");
    const tokenHeader = { headers: {
        'x-auth-token': JsonWT
      }}
    axios.put('http://localhost:5000/api/users/create-post', {
            text: postData.text,
            imageString: postData.imageString
    }, tokenHeader)
    .then(res => dispatch({
        type: EDIT_POST,
        payload: res.data
    }))
}