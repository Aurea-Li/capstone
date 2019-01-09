const initState = {
  groupError: null
}

const groupReducer = (state = initState, action) => {
  console.log('action is', action);
  switch(action.type){
    case 'ADD_GROUP':
      return {
        ...state,
        groupError: null
      }
    case 'ADD_GROUP_ERROR':
      return {
        ...state,
        groupError: action.error.message
      }
    case 'JOIN_GROUP':
      return {
        ...state,
        groupError: null
      }
    case 'JOIN_GROUP_ERROR':
      return {
        ...state,
        groupError: action.error.message
      }
    default:
      return state
  }
}

export default groupReducer
