import { CREATE_NEW_USER, LOGIN_SQUAWK_USER, GET_SQUAWK_USER } from '../actions/types';
import { initialPicture } from '../../src/constants'  ;

const initialState = {
      info: {
        aboutMe: "",
        birdCall: "",
        birdsIWatch: [],
        emailAddress: "",
        friends: [],
        incomingFriendRequests: [],
        isOnline: false,
        joinedDate: "",
        myBirds: [],
        outgoingFriendRequests: [],
        password: "Haha, you no see.",
        posts: [],
        profilePicture: initialPicture,
        username: "",
        _id: ""
}}

const userReducer = (state = initialState, action) => {
 switch(action.type){
    case CREATE_NEW_USER:
      return {
        ...state,
        info: action.payload
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