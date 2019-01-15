const initState = {
  requestError: null
}

const requestReducer = (state = initState, action) => {
  switch(action.type){
    case 'GET_REQUESTS':
      return {
        ...state,
        requests: action.requests
      }
    case 'ADD_REQUEST':
      return {
        ...state,
        requests: [...state.requests, action.requestInfo]
      }
    case 'REMOVE_REQUEST':

    let index = 0;
    for (let i = 0; i < state.requests.length; i += 1){
      if (state.requests[i].id === action.request.id){
        index = i;
      }
    }

      return {
        ...state,
        requests: [
          ...state.requests.slice(0, index),
          ...state.requests.slice(index + 1)
        ]
      }
    case 'REQUEST_FULFILLED':
      return state;
    default:
      return state
  }
}

export default requestReducer
