import { FEED_UPDATED } from '../actions/types'

const feedUpdatedReducer = (state = false, action) => {
    switch(action.type){
        case FEED_UPDATED:
            return !state;
        default:
            return state;
    }
}
export default feedUpdatedReducer