const initialState = {
    posts: [{ id: 1, title: 'Test Post' }]
}

const postReducer = (state = initialState, action) => {
 switch(action.type){
    case 'ADD_POST':
      return { ...state,
        posts: state.posts.concat(action.payload)
      }
    case 'LOAD_POSTS':
        return {
            ...state,
            posts: state.posts.concat(action.payload)
        }
    default:
      return state
  }
  return state
}

export default postReducer;