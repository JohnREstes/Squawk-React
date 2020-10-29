import { SIGN_IN, LOGIN_USER, CREATE_NEW_USER, FEED, FRIENDS, EDIT_PROFILE, CREATE_ACCOUNT, GET_SQUAWK_USER } from './types';
import axios from 'axios'
import $ from 'jquery'

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
        $('#invalid').css('display', 'none');
        console.log(res.data);
        localStorage.setItem("JWT", res.data);
        const JsonWT = localStorage.getItem("JWT");
        const tokenHeader = { headers: {
            'x-auth-token': JsonWT
          }}
          axios.get('http://localhost:5000/api/users/user-profile', tokenHeader)
          .then(res => {
              dispatch({
                  type: GET_SQUAWK_USER,
                  payload: res.data,
              })
            })
            .then(
                dispatch({
                    type: SIGN_IN
                }))
    })
    .catch(err => {
        $('#invalid').css('display', 'initial');
        console.log(err)
    })
};
export const getSquawkUser = () => dispatch => {
    const JsonWT = localStorage.getItem("JWT");
    const tokenHeader = { headers: {
        'x-auth-token': JsonWT
        }}
        axios.get('http://localhost:5000/api/users/user-profile', tokenHeader)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_SQUAWK_USER,
                payload: res.data,
            })
        })
    .catch(err => {
        console.log(err)
    })
};

export const logoutSquawkUser = () => dispatch => {
    axios.post('http://localhost:5000/api/users/log-out')
    .then(() => {
        localStorage.removeItem("JWT");
    })
    .then(
        dispatch({
            type: SIGN_IN
        }) 
    )
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