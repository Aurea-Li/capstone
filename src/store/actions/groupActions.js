export const createGroup = (group) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore();
    const adminID = getState().firebase.auth.uid;

    firestore.collection('groups').add({
      ...group,
      adminID,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_GROUP' });
    }).catch(error => {
      dispatch({ type: 'CREATE_GROUP_ERROR', error })
    })
  }
};
