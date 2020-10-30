import { LOAD_FLOCK_PROFILES } from '../actions/types';

const flockListReducer = (state = null, action) => {
 switch(action.type){
    case LOAD_FLOCK_PROFILES:
      return {
        ...state,
        feed: action.payload
      }
    default:
      return state
  }
}

export default flockListReducer;