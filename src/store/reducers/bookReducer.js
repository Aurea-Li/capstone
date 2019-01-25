const sortedBooks = (books) => {
  return books.sort((a, b) => a.book.title.localeCompare(b.book.title));
}

const bookReducer = (state = {}, action) => {
  switch(action.type){
    case 'GET_BOOKS':
      return {
        ...state,
        books: sortedBooks(action.books)
      }
    case 'GET_BORROWED_BOOKS':
      return {
        ...state,
        borrowedBooks: sortedBooks(action.borrowedBooks)
      }
    case 'ADD_BOOK':
      return state;
    case 'REMOVE_BOOK':
      return state;
    case 'REQUEST_FULFILLED':

      let index = 0;
      for (let i = 0; i < state.books.length; i += 1){
        if (state.books[i].book.id === action.book.id){
          console.log(state.books[i].book.id);
          index = i;
        }
      };

      return {
        ...state,
        books: sortedBooks([
          ...state.books.slice(0, index),
          ...state.books.slice(index + 1)
        ])
      }
    case 'RETURN_BOOK':
      return state;
    default:
      return state
  }
}

export default bookReducer
