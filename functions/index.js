const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createUserGroups = ((uid) => {
  return admin.firestore().collection('usergroups').doc(`${uid}`).set({
  });
});

const createGroupUsers = ((groupID) => {
  return admin.firestore().collection('groupusers').doc(`${groupID}`).set({
  });
});

exports.groupCreated = functions.firestore
  .document('groups/{groupID}')
  .onCreate(doc => {

    const group = doc.data();

    const groupUsers = {
      [`${group.id}`]: { [`${group.uid}`]: true }
    };

    admin.firestore().collection('usergroups').get(`${group.uid}`).update({
      [`${group.id}`]: true
    });

    return createGroupUsers(groupUsers);

});

exports.userJoined = functions.auth
.user()
.onCreate(user => {

  return admin.firestore().collection('users')
  .doc(user.uid).get().then(doc => {

    return createUserGroups(user.uid);
  });

});
