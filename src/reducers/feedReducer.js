import { LOAD_FEED, CREATE_POST } from '../actions/types';

const feedReducer = (state = null, action) => {
 switch(action.type){
    case LOAD_FEED:
      return {
        ...state,
        feed: action.payload
      }
    case CREATE_POST:
      return {
        ...state,
        feed: action.payload
      }      
    default:
      return state
  }
}

export default feedReducer;