const sortedRequests = (requests) => {
  return requests.sort((a, b) => a.request.title.localeCompare(b.request.title));
}

const requestReducer = (state = {}, action) => {
  switch(action.type){
    case 'GET_REQUESTS':
      return {
        ...state,
        requests: sortedRequests(action.requests)
      }
    case 'ADD_REQUEST_EXISTING':
      if (!state.requests){
        return state;
      }

      return {
        ...state,
        requests: sortedRequests([...state.requests, action.request])
      }

    case 'ADD_REQUEST_NEW':
      return state;
    case 'REMOVE_REQUEST':

    debugger;

    if (!state.requests){
      return state;
    }

    let index = 0;
    for (let i = 0; i < state.requests.length; i += 1){
      if (state.requests[i].request.id === action.request.id){
        index = i;
      }
    }

    debugger;

    return {
      ...state,
      requests: sortedRequests([
        ...state.requests.slice(0, index),
        ...state.requests.slice(index + 1)
      ])
    }
    case 'REQUEST_FULFILLED':
      return state;
    default:
      return state
  }
}

export default requestReducer
