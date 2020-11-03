import { LOAD_FLOCK_PROFILES, LOAD_FLOCK_LIST } from './types';
import axios from 'axios'

export const loadFlockList = () => dispatch => {
    const JsonWT = localStorage.getItem("JWT");
    const tokenHeader = { headers: {
        'x-auth-token': JsonWT
        }}
        axios.get('http://localhost:5000/api/users/online-friends', tokenHeader)
        .then(res => {
            dispatch({
                type: LOAD_FLOCK_LIST,
                payload: res.data,
            })
        })
    .catch(err => {
        console.log(err)
    })
};

export const loadFlockProfiles = () => dispatch => {
    const JsonWT = localStorage.getItem("JWT");
    const tokenHeader = { headers: {
        'x-auth-token': JsonWT
        }}
        axios.get('http://localhost:5000/api/users/all-friends-profiles', tokenHeader)
        .then(res => {
            dispatch({
                type: LOAD_FLOCK_PROFILES,
                payload: res.data,
            })
        })
    .catch(err => {
        console.log(err)
    })
};