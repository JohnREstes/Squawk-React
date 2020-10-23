import counterReducer from './counter';
import loggedReducer from './isLogged';
import userReducer from './userReducer';
import pageDisplayedReducer from './pageDisplayedReducer';
import birdFactReducer from './birdFactReducer'
import { combineReducers } from 'redux';

export default combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    user: userReducer,
    pageDisplayed: pageDisplayedReducer,
    birdFact: birdFactReducer
})