const initState = {
  groupError: null
}

const groupReducer = (state = initState, action) => {
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
      case 'LEAVE_GROUP':
        return {
          ...state,
          groupError: null
        }
      case 'LEAVE_GROUP_ERROR':
        return {
          ...state,
          groupError: action.error.message
        }
    default:
      return state
  }
}

export default groupReducer
