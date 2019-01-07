const initState = {
  requestError: null
}

const requestReducer = (state = initState, action) => {
  switch(action.type){
    case 'ADD_REQUEST':
      return {
        ...state,
        requestError: null
      }
    case 'ADD_REQUEST_ERROR':
      return {
        ...state,
        requestError: action.error.message
      }
    case 'REMOVE_REQUEST':
      return {
        ...state,
        requestError: null
      }
    case 'REMOVE_REQUEST_ERROR':
      return {
        ...state,
        requestError: action.error.message
      }
    default:
      return state
  }
}

export default requestReducer
