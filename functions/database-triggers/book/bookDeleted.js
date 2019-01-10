const {
  admin,
  db
} = require('../../admin');

const bookDeleted = (doc, context) => {

    const userID = doc.data().userID;
    const { bookID } = context.params;

    return db.collection('users').doc(`${userID}`).update({
      books: admin.firestore.FieldValue.arrayRemove(`${bookID}`)
    });

};

module.exports = bookDeleted;
