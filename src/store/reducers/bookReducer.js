const initState = {
  bookError: null
}

const bookReducer = (state = initState, action) => {
  switch(action.type){
    case 'GET_BOOKS':
      return {
        ...state,
        books: action.books
      }
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
    case 'REQUEST_FULFILLED':

      let index = 0;
      for (let i = 0; i < state.books.length; i += 1){
        if (state.books[i].book.id === action.book.id){
          index = i;
        }
      };

      return {
        ...state,
        books: [
          ...state.books.slice(0, index),
          ...state.books.slice(index + 1)
        ]
      }
    case 'RETURN_BOOK':
      // const updatedBooks = state.books.map(book => {
      //
      //   if (book.id === action.book.id){
      //     return action.book;
      //   }
      //
      //   return book;
      // })

      return {
        ...state,
        bookError: null
      }
    case 'RETURN_BOOK_ERROR':
      return {
        ...state,
        bookError: action.error.message
      }
    default:
      return state
  }
}

export default bookReducer
