const {
  admin,
  db
} = require('../../admin');

const requestDeleted = (doc, context) => {

    const userID = doc.data().userID;
    const { requestID } = context.params;

    return db.collection('users').doc(`${userID}`).update({
      requests: admin.firestore.FieldValue.arrayRemove(`${requestID}`)
    });
};

module.exports = requestDeleted;
