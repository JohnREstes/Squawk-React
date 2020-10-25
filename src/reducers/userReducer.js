import { CREATE_NEW_USER } from '../actions/types';

const initialState = {
    userDetails: {}
}

const userReducer = (state = initialState, action) => {
 switch(action.type){
    case CREATE_NEW_USER:
      return {
        ...state,
        userDetails: action.payload
      }
    case 'LOGIN_USER':
      return { 
        ...state,
        login: state.users = action.payload

      }
    case 'LOGIN_SQUAWK_USER':
      return { ...state,
        header: action.payload

      }
    default:
      return state
  }
}

export default userReducer;