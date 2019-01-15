export const getBorrowedBooks = borrowedBooks => ({
  type: 'GET_BORROWED_BOOKS',
  borrowedBooks
})

export const getBooks = (books) => ({
  type: 'GET_BOOKS',
  books
})


export const addBook = (result) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore();
    const userID = getState().firebase.auth.uid;
    
    const book = {
      title: result.title,
      authors: result.authors,
      img: result.imageLinks.smallThumbnail,
      status: 'Available',
      borrowerID: null,
      borrowedDate: null,
      borrowerFirstName: null,
      borrowerLastName: null
    }

    firestore.collection('books').add({
      ...book,
      userID
    }).then(() => {
      dispatch({ type: 'ADD_BOOK' });
    }).catch(error => {
      dispatch({ type: 'BOOK_ERROR', error })
    })

  }
};

export const removeBook = (book) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore();

    firestore.collection('books').doc(book.id).delete()
    .then(() => {
      dispatch({ type: 'REMOVE_BOOK', book });
    }).catch(error => {
      dispatch({ type: 'BOOK_ERROR', error })
    })
  }
};

export const returnBook = (book) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('books').doc(book.id).update({
      status: 'Available',
      borrowerID: null,
      borrowedDate: null,
      borrowerFirstName: null,
      borrowerLastName: null
    }).then(() => {
      dispatch({ type: 'RETURN_BOOK', book })
    }).catch(error => {
      dispatch({ type: 'BOOK_ERROR', error })
    })
  }
}
