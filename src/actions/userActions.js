import { INCREMENT, DECREMENT, SIGN_IN, LOGIN_USER, CREATE_NEW_USER, FEED, FRIENDS, EDIT_PROFILE, CREATE_ACCOUNT, LOAD_FEED, LOGIN_SQUAWK_USER } from './types';
import axios from 'axios';
import $ from 'jquery'

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
export const loginUser = info => dispatch => {
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
    })
    .catch(err => {
        console.log(err)
    })
};
export const loginSquawkUser = userInfo => dispatch => {
    axios.post('http://localhost:5000/api/auth',
    {
        usernameOrEmailAddress: userInfo.usernameOrEmailAddress,
        password: userInfo.password
    })
    .then(res => {
        console.log(res);
        dispatch({
            type: LOGIN_SQUAWK_USER,
            payload: res
        });
    })
    .catch(err => {
        $('#invalid').css('display', 'initial');
        console.log(err)
    })
};
export const feed = () => dispatch => {
    dispatch({
        type: FEED,
    });
};
export const friends = () => dispatch => {
    dispatch({
        type: FRIENDS,
    });
};
export const editProfile = () => dispatch => {
    dispatch({
        type: EDIT_PROFILE,
    });
};
export const createAccount = () => dispatch => {
    dispatch({
        type: CREATE_ACCOUNT,
    });
};
export const createFeed = () => dispatch => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => dispatch({
            type: LOAD_FEED,
            payload: res.data
        }));
};
