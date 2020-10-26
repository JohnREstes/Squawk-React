import { CREATE_NEW_USER, LOGIN_SQUAWK_USER, LOGIN_USER } from '../actions/types';

const initialState = {
      login:{
        username: "",
        _id: ""
      }
}

const userReducer = (state = initialState, action) => {
 switch(action.type){
    case CREATE_NEW_USER:
      return {
        ...state,
        userDetails: action.payload
      }
    case LOGIN_SQUAWK_USER:
      return { ...state,
        login: action.payload,
        JWT: action.JWT

      }
    default:
      return state
  }
}

export default userReducer;