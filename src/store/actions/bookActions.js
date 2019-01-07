export const addBook = ({ title }) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userID = getState().firebase.auth.uid;


    const URL = `https://www.googleapis.com/books/v1/volumes?q=${title}&filter=ebooks`;
    fetch(URL, { method: 'GET' })
    .then((response) => { response.json().then((response) => {

        const results = response.items[0].volumeInfo;
        const book = {
          title: results.title,
          authors: results.authors,
          categories: results.categories,
          img: results.imageLinks.smallThumbnail
        }

        firestore.collection('books').add({
          ...book,
          owner: `${profile.firstName} ${profile.lastName}`,
          userID
        }).then(() => {
          dispatch({ type: 'ADD_BOOK', book });
        }).catch(error => {
          dispatch({ type: 'ADD_BOOK_ERROR', error })
        })
      })
    }).catch(error => {
      dispatch({ type: 'ADD_BOOK_ERROR', error })
    });
  }
};

export const removeBook = (book) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();

    firestore.collection('books').doc(book.id).delete()
    .then(() => {
      dispatch({ type: 'REMOVE_BOOK', book });
    }).catch(error => {
      dispatch({ type: 'REMOVE_BOOK_ERROR', error })
    })
  }
};
