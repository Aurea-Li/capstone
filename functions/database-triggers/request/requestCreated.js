const {
  admin,
  db
} = require('../../admin');

const requestCreated = (doc, context) => {

    const userID = doc.data().userID;
    const { requestID } = context.params;

    return db.collection('users').doc(`${userID}`).update({
      requests: admin.firestore.FieldValue.arrayUnion(`${requestID}`)
    });
};

module.exports = requestCreated;
