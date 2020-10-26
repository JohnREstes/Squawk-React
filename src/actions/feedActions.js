import { LOAD_FEED } from './types'
import axios from 'axios'

export const createFeed = () => dispatch => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => dispatch({
            type: LOAD_FEED,
            payload: res.data
        }));
};