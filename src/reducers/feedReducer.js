import { LOAD_FEED, CLEAR_FEED } from '../actions/types';

const initialState = {
  feed: ""
}

const feedReducer = (state = initialState, action) => {
 switch(action.type){
    case LOAD_FEED:
      return {
        ...state,
        feed: action.payload
      }
      case CLEAR_FEED:
        return {
          ...state,
          feed: ""
        }
    default:
      return state
  }
}

export default feedReducer;