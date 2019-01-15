export const getGroups = groups => ({
  type: 'GET_GROUPS',
  groups
})

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

export const leaveGroup = (group) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore();
    const firebase = getFirebase();
    const uid = getState().firebase.auth.uid;

    const URL = `https://us-central1-al-capstone.cloudfunctions.net/app/members?groupID=${group.id}`;

    fetch(URL, { method: 'GET' })
    .then(res => { res.json().then(res => {

      // Check if user is already in group
      let neverJoined = true;
      res.forEach(member => {
        if (member.id === uid){

          neverJoined = false;
        }
      });

      if (neverJoined){
        const error = { message: `not in group ${group.name}`};
        dispatch({ type: 'LEAVE_GROUP_ERROR', error })
      }
      else {

        const promises = [
          firestore.collection('usergroups').doc(`${uid}`).update({
            [`${group.id}`]: firebase.firestore.FieldValue.delete()
          }),
          firestore.collection('groupusers').doc(`${group.id}`).update({
            [`${uid}`]: firebase.firestore.FieldValue.delete()
          })
        ];

        Promise.all(promises).then(() => {
          dispatch({ type: 'LEAVE_GROUP',
                     group
                   });
        })

      }
    })
    .catch(error => {
      dispatch({ type: 'LEAVE_GROUP_ERROR', error });
    })
    })
    .catch(error => {
      dispatch({ type: 'LEAVE_GROUP_ERROR', error });
    });
  }
}

export const joinGroup = (group) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

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

        const promises = [
          firestore.collection('usergroups').doc(`${uid}`).update({
            [`${group.id}`]: true
          }),
          firestore.collection('groupusers').doc(`${group.id}`).update({
            [`${uid}`]: true
          })
        ]

        Promise.all(promises).then(() => {
            dispatch({ type: 'JOIN_GROUP',
            group
          });
        })
        .catch(error => {
          dispatch({ type: 'JOIN_GROUP_ERROR', error });
        })

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
