import counterReducer from './counter';
import loggedReducer from './isLogged';
import postReducer from './postReducer'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    posts: postReducer
})
export default allReducers;