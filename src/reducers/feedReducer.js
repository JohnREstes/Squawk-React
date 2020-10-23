import { LOAD_FEED } from '../actions/types';

const initialState = {
    userDetails: {}
}

const feedReducer = (state = initialState, action) => {
 switch(action.type){
    case LOAD_FEED:
      return {
        ...state,
        feed: action.payload
      }
    default:
      return state
  }
}

export default feedReducer;