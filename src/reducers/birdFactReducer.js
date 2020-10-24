import { BIRD_FACTS, BIRD_IMAGE } from '../actions/types';

let initialState = {
    fact: 'Hoatzin chicks are born with claws on their wings.',
    link: 'https://i.some-random-api.ml/1stP458w9J.png'
}

const birdFactReducer = (state = initialState, action) => {
 switch(action.type){
    case BIRD_FACTS:
      return {
        ...state,
        fact: action.payload
      }
    case BIRD_IMAGE:
      return {
        ...state,
        link: action.payload
      }
      default:
        return state
    }
}

export default birdFactReducer;