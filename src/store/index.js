import { createStore } from 'redux'

const initialState = {
  posts: [{ id: 1, title: 'Test Post' }],
  loginModal: {
    open: false
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type){ 
    case 'ADD_POST': {
        return {
            ...state,
            posts: state.posts.concat(action.payload)
        }
    }
    case 'LOAD_POSTS': {
        return {
            ...state,
            posts: state.posts.concat(action.payload)
        }
    }
  }

  return state
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store