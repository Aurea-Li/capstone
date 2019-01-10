const {
  admin,
  db
} = require('../../admin');

const bookCreated = (doc, context) => {

    const userID = doc.data().userID;
    const { bookID } = context.params;

    return db.collection('users').doc(`${userID}`).update({
      books: admin.firestore.FieldValue.arrayUnion(`${bookID}`)
    });

};

module.exports = bookCreated;
