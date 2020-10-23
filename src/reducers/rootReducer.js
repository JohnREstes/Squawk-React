import counterReducer from './counter';
import loggedReducer from './isLogged';
import userReducer from './userReducer'
import { combineReducers } from 'redux';

export default combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    user: userReducer
})
