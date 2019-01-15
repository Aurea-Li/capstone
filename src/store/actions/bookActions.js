export const getBorrowedBooks = borrowedBooks => ({
  type: 'GET_BORROWED_BOOKS',
  borrowedBooks
})

export const getBooks = (books) => ({
  type: 'GET_BOOKS',
  books
})


export const addBook = ({ title }) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore();
    const userID = getState().firebase.auth.uid;


    const URL = `https://www.googleapis.com/books/v1/volumes?q=${title}&filter=ebooks`;
    fetch(URL, { method: 'GET' })
    .then((response) => { response.json().then((response) => {

        const results = response.items[0].volumeInfo;

        const book = {
          title: results.title,
          authors: results.authors,
          img: results.imageLinks.smallThumbnail,
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
      })
    }).catch(error => {
      dispatch({ type: 'BOOK_ERROR', error })
    });
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
