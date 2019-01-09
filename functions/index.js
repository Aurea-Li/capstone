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

  admin.firestore().collection('groupusers').doc(`${groupID}`).get()
  .then(snapshot => {
    const data = snapshot.data();

    const promises = []


    Object.keys(data).forEach((userID) => {
      promises.push(
        admin.firestore().collection('users').doc(`${userID}`).get()
      );
    })

    Promise.all(promises).then(querySnapshot => {
      const names = querySnapshot.map(query => {
        const data = query.data();
        return `${data.firstName} ${data.lastName}`;
      });

      response.send(names);

    })
    .catch(error => {
      response.status(500).send(error);
    });
  })
  .catch(error => {
    response.status(500).send(error);
  });

})
