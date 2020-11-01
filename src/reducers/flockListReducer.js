import { LOAD_FLOCK_PROFILES } from '../actions/types';

const initialState = {
  friendsAndStatus: {
    friendsAndOnlineStatuses: []
  }
  
}

const flockListReducer = (state = initialState, action) => {
 switch(action.type){
    case LOAD_FLOCK_PROFILES:
      return {
        ...state,
        friendsAndStatus: action.payload
      }
    default:
      return state
  }
}

export default flockListReducer;