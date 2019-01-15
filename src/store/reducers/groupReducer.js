const initState = {
  groupError: null
}

const groupReducer = (state = initState, action) => {
  switch(action.type){
    case 'GET_GROUPS':
      return {
        ...state,
        groups: action.groups
      }
    case 'ADD_GROUP':
      return {
        ...state,
        groups: [...state.groups, action.group]
      }
    case 'ADD_GROUP_ERROR':
      return state;
    case 'JOIN_GROUP':
      return {
        ...state,
        groups: [...state.groups, action.group]
      }
      case 'LEAVE_GROUP':

        let index = 0;
        for (let i = 0; i < state.groups.length; i += 1){
          if (state.groups[i].id === action.group.id){
            index = i;
          }
        }

        return {
          ...state,
          groups: [
            ...state.groups.slice(0, index),
            ...state.groups.slice(index + 1)
          ]
        }
    default:
      return state
  }
}

export default groupReducer
