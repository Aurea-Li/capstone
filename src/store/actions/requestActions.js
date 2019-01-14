export const addRequest = ({ title }) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore();
    const userID = getState().firebase.auth.uid;


    const URL = `https://www.googleapis.com/books/v1/volumes?q=${title}&filter=ebooks`;
    fetch(URL, { method: 'GET' })
    .then((response) => { response.json().then((response) => {

        const results = response.items[0].volumeInfo;

        const request = {
          title: results.title,
          authors: results.authors,
          img: results.imageLinks.smallThumbnail,
          createdAt: new Date()
        }

        firestore.collection('requests').add({
          ...request,
          userID
        }).then(() => {
          dispatch({ type: 'ADD_REQUEST' });
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
      dispatch({ type: 'REMOVE_REQUEST' });
    }).catch(error => {
      dispatch({ type: 'REMOVE_REQUEST_ERROR', error })
    })
  }
};
