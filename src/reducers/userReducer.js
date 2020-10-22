const initialState = {
    users: [{ id: 1, user: 'John', password: '123' }]
}

const postReducer = (state = initialState, action) => {
 switch(action.type){
    case 'LOGIN_USER':
      return { state,
        login: state.users = action.payload

      }
    case 'LOAD_POSTS':
        return {
            state,
            login: state.title = action.payload
        }
    default:
      return state
  }
}

export default postReducer;