import { BIRD_FACTS } from '../actions/types';

let initialState = {
    fact: ''
}

const birdFactReducer = (state = initialState, action) => {
 switch(action.type){
    case BIRD_FACTS:
      return {
        ...state,
        fact: action.payload
      }
      default:
        return state
    }
}

export default birdFactReducer;