const bookReducer = (state = {}, action) => {
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
      return state;
    case 'REMOVE_BOOK':
      return state;
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
      return state;
    default:
      return state
  }
}

export default bookReducer
