import { CREATE_NEW_USER, LOGIN_SQUAWK_USER, GET_SQUAWK_USER } from '../actions/types';

const initialState = {
      login:{
        username: "",
        _id: "",
        JWT: ""
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
        info: action.payload,
        JWT: action.JWT
      }
    case GET_SQUAWK_USER:
      return { ...state,
        info: action.payload
      }
    default:
      return state
  }
}

export default userReducer;