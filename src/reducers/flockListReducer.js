import { LOAD_FLOCK_PROFILES, LOAD_FLOCK_LIST } from '../actions/types';

const initialState = {
  friendsAndStatus: {
    friendsAndOnlineStatuses: []
  },
  friendsProfiles: {
    allFriendsProfiles: []
  }
  
}

const flockListReducer = (state = initialState, action) => {
 switch(action.type){
    case LOAD_FLOCK_PROFILES:
      return {
        ...state,
        friendsProfiles: action.payload
      }
    case LOAD_FLOCK_LIST:
      return {
        ...state,
        friendsAndStatus: action.payload
      }
    default:
      return state
  }
}

export default flockListReducer;