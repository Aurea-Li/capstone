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

export const joinGroup = (group) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    
    console.log('join group triggered');

    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;

    const URL = `https://us-central1-al-capstone.cloudfunctions.net/app/members?groupID=${group.id}`;

    fetch(URL, { method: 'GET' })
    .then(res => { res.json().then(res => {

      // Check if user is already in group
      let alreadyJoined = false;
      res.forEach(member => {
        if (member.id === uid){

          alreadyJoined = true;
        }
      });

      if (alreadyJoined){
        const error = { message: `already joined group ${group.name}`};
        dispatch({ type: 'JOIN_GROUP_ERROR', error })
      }
      else {

        firestore.collection('usergroups').doc(`${uid}`).update({
          [`${group.id}`]: true
        });

        firestore.collection('groupusers').doc(`${group.id}`).update({
          [`${uid}`]: true
        });

        dispatch({ type: 'JOIN_GROUP' });

      }
    })
    .catch(error => {
      dispatch({ type: 'JOIN_GROUP_ERROR', error });
    })
  })
  .catch(error => {
    dispatch({ type: 'JOIN_GROUP_ERROR', error });
  });
}
}
