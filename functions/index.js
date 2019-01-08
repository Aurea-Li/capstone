const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createGroupUser = ((groupUser) => {
  return admin.firestore().collection('groupuser').add(groupUser)
  .then(doc => console.log('groupuser added', doc));
});

exports.groupCreated = functions.firestore
  .document('groups/{groupID}')
  .onCreate(doc => {

    const group = doc.data();

    const groupUser = {
      groupID: '1234',
      userID: '12355'
    };

    return createGroupUser(groupUser);

  });
