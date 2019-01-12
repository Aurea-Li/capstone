const initState = {
  bookError: null
}

const bookReducer = (state = initState, action) => {
  switch(action.type){
    case 'GET_BORROWED_BOOKS':
      return {
        ...state,
        borrowedBooks: action.borrowedBooks
      }
    case 'ADD_BOOK':
      return {
        ...state,
        bookError: null
      }
    case 'ADD_BOOK_ERROR':
      return {
        ...state,
        bookError: action.error.message
      }
    case 'REMOVE_BOOK':
      return {
        ...state,
        bookError: null
      }
    case 'REMOVE_BOOK_ERROR':
      return {
        ...state,
        bookError: action.error.message
      }
    default:
      return state
  }
}

export default bookReducer
