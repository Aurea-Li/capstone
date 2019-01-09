const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// CORS Express middleware to enable CORS Requests.
const express = require('express');
const app = express();

// [START middleware]
const cors = require('cors')({origin: true});
app.use(cors);
// [END middleware]


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

app.get('/',(res,req) => {
  res.json({ test: 'test' });
})


app.get('/members',(request, response) => {

  const groupID = request.query.groupID;

  admin.firestore().collection('groupusers').doc(`${groupID}`).get()
  .then(snapshot => {
    const data = snapshot.data();

    const promises = [];

    Object.keys(data).forEach((userID) => {
      promises.push(
        admin.firestore().collection('users').doc(`${userID}`).get()
      );
    })

    Promise.all(promises).then(querySnapshot => {
      const names = querySnapshot.map(query => {
        const data = query.data();
        return {
          name: `${data.firstName} ${data.lastName}`,
          id: `${query.id}`
        };
      });

      response.json(names);

    })
    .catch(error => {
      response.status(500).send(error);
    });
  })
  .catch(error => {
    response.status(500).send(error);
  });

});

exports.app = functions.https.onRequest(app);
