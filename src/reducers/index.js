import counterReducer from './counter';
import loggedReducer from './isLogged';
import userReducer from './userReducer'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    users: userReducer
})
export default allReducers;