export const getRequests = requests => ({
  type: 'GET_REQUESTS',
  requests
})


export const addRequest = ({ title }) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore();
    const userID = getState().firebase.auth.uid;
    ;


    const URL = `https://www.googleapis.com/books/v1/volumes?q=${title}&filter=ebooks`;
    fetch(URL, { method: 'GET' })
    .then((response) => { response.json().then((response) => {

        const results = response.items[0].volumeInfo;

        const request = {
          title: results.title,
          authors: results.authors,
          img: results.imageLinks.smallThumbnail,
          createdAt: new Date(),
          userID
        }

        firestore.collection('requests').add(request).then(() => {
          dispatch({ type: 'ADD_REQUEST', request });
        }).catch(error => {
          dispatch({ type: 'ADD_REQUEST_ERROR', error })
        })
      })
    }).catch(error => {
      dispatch({ type: 'ADD_REQUEST_ERROR', error })
    });
  }
};

export const removeRequest = (request) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore();

    firestore.collection('requests').doc(request.id).delete()
    .then(() => {
      dispatch({ type: 'REMOVE_REQUEST', request });
    }).catch(error => {
      dispatch({ type: 'REMOVE_REQUEST_ERROR', error })
    })
  }
};

export const requestExistingBook = (book) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {


    const firestore = getFirestore();
    const userID = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;


    const { title, authors, img } = book;

    const request = {
      title,
      authors,
      img,
      userID,
      createdAt: new Date()
    }

    const requestInfo = {
      request,
      user: profile
    }

    firestore.collection('requests').add(request).then(() => {
      dispatch({ type: 'ADD_REQUEST', requestInfo });
    })
    .catch(error => {
      dispatch({ type: 'ADD_REQUEST_ERROR', error });
    })
  }
};

export const fulfillRequest = (request) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore();
    const profile = getState().firebase.profile;


    const bookPromises = [];
    profile.books.forEach(bookID => {
      bookPromises.push(
        firestore.collection('books').doc(`${bookID}`).get()
      );
    })

    Promise.all(bookPromises).then(querySnapshot => {

      querySnapshot.forEach(query => {
        const book = query.data();
        const bookID = query.id;

        if (book.title === request.title
          && book.authors.join('') === request.authors.join('')
          && book.status === 'Available'){

            const promises = [
              firestore.collection('books').doc(`${bookID}`).update({
                borrowerID: request.userID,
                borrowedDate: new Date(),
                status: 'Unavailable'
              }),
              firestore.collection('requests').doc(`${request.id}`).delete()
            ];

            Promise.all(promises).then(querySnapshot => {

              firestore.collection('books').doc(`${bookID}`).get().then((updatedBook) => {

                const book = updatedBook.data();
                book.id = updatedBook.id;
                
                dispatch({ type: 'REQUEST_FULFILLED', book })
                dispatch({ type: 'REMOVE_REQUEST', request })
              })

            })
            .catch(error => {
              dispatch({ type: 'REQUEST_FULFILLED_ERROR', error })
            })
          } else {

            const error = {
              message: 'Book not available in library'
            }
            dispatch({ type: 'REQUEST_FULFILLED_ERROR', error })
          }
      })
    })
    .catch(error => {
      dispatch({ type: 'REQUEST_FULFILLED_ERROR', error })
    })
  }
}
