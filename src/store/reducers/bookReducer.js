const bookReducer = (state = {}, action) => {
  switch(action.type){
    case 'ADD_BOOK':
      return state
    case 'ADD_BOOK_ERROR':
      return state
    default:
      return state
  }
}

export default bookReducer
