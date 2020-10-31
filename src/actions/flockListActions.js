import { LOAD_FLOCK_PROFILES } from './types';
import axios from 'axios'

export const loadFlockProfiles = () => dispatch => {
    console.log("Load Your Flock");
    const JsonWT = localStorage.getItem("JWT");
    const tokenHeader = { headers: {
        'x-auth-token': JsonWT
        }}
        axios.get('http://localhost:5000/api/users/online-friends', tokenHeader)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: LOAD_FLOCK_PROFILES,
                payload: res.data,
            })
        })
    .catch(err => {
        console.log(err)
    })
};