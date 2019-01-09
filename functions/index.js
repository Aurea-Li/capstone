const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const createUserGroups = ((uid) => {
  return admin.firestore().collection('usergroups').doc(`${uid}`).set({
  });
});

const createGroupUsers = ((userID, groupID) => {
  return admin.firestore().collection('groupusers').doc(`${groupID}`).set({
    [`${userID}`]: true
  });
});

exports.groupCreated = functions.firestore
  .document('groups/{groupID}')
  .onCreate((doc, context) => {

    const userID = doc.data().adminID;
    const { groupID } = context.params;


    admin.firestore().collection('usergroups').doc(`${userID}`).update({
      [`${groupID}`]: true
    });

    return createGroupUsers(userID, groupID);

});

exports.userJoined = functions.auth
.user()
.onCreate(user => {

  return admin.firestore().collection('users')
  .doc(user.uid).get().then(doc => {

    return createUserGroups(user.uid);
  });

});

exports.getMembers = functions.https.onRequest((request, response) => {

  const groupID = request.query.groupID;

  admin.firestore().doc(`groupusers/${groupID}`).get()
  .then(snapshot => {
    response.send(snapshot.data());
  })
  .catch(error => {
    response.status(500).send(error);
  });

})
