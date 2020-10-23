import { INCREMENT, DECREMENT, SIGN_IN, LOGIN_USER, CREATE_NEW_USER } from './types';
import axios from 'axios';

//each action creator is a function
//thunk middleware allows us to call dispatch function directly so we can make asynchronous requests
//dispatch is like resolving a promise; dispatch allows for sending of data

export const increment = number => dispatch => {
    dispatch({
        type: INCREMENT,
        payload: number
    });
};
export const decrement = number => dispatch => {
    dispatch({
        type: DECREMENT,
        payload: number
    });
};
export const loginToggle = () => dispatch => {
    dispatch({
        type: SIGN_IN
    });
};
export const addPost = info => dispatch => {
    dispatch({
        type: LOGIN_USER,
        payload: info
    });
};
export const createNewUser = userInfo => dispatch => {
    axios.post('http://localhost:5000/api/users',
    {
        username: userInfo.username,
        password: userInfo.password,
        emailAddress: userInfo.emailAddress
    })
    .then(res => {
        const allUserInfo = {
            token: res.headers['x-auth-token'],
            ...res.data
        }
        dispatch({
            type: CREATE_NEW_USER,
            payload: allUserInfo
        });
    });
};