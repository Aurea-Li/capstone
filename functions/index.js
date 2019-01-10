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

exports.bookCreated = functions.firestore
  .document('books/{bookID}')
  .onCreate((doc, context) => {

    const userID = doc.data().userID;
    const { bookID } = context.params;

    return admin.firestore().collection('users').doc(`${userID}`).update({
      books: admin.firestore.FieldValue.arrayUnion(`${bookID}`)
    });

});

exports.bookDeleted = functions.firestore
  .document('books/{bookID}')
  .onDelete((doc, context) => {

    const userID = doc.data().userID;
    const { bookID } = context.params;

    return admin.firestore().collection('users').doc(`${userID}`).update({
      books: admin.firestore.FieldValue.arrayRemove(`${bookID}`)
    });

});

exports.requestCreated = functions.firestore
  .document('requests/{requestID}')
  .onCreate((doc, context) => {

    const userID = doc.data().userID;
    const { requestID } = context.params;

    return admin.firestore().collection('users').doc(`${userID}`).update({
      requests: admin.firestore.FieldValue.arrayUnion(`${requestID}`)
    });
});

exports.requestDeleted = functions.firestore
  .document('requests/{requestID}')
  .onDelete((doc, context) => {

    const userID = doc.data().userID;
    const { requestID } = context.params;

    return admin.firestore().collection('users').doc(`${userID}`).update({
      requests: admin.firestore.FieldValue.arrayRemove(`${requestID}`)
    });
});

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

app.get('/availablebooks',(request, response) => {

  const groupID = request.query.groupID;
  let bookIDs = [];

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

      querySnapshot.forEach(query => {

        console.log('query is', query.data());
        bookIDs.push(query.data().books);
      })

      bookIDs = bookIDs.flat();

      const bookPromises = [];
      bookIDs.forEach(bookID => {
        bookPromises.push(
          admin.firestore().collection('books').doc(`${bookID}`).get()
        )
      })

      Promise.all(bookPromises).then(bookquerySnapshot => {

        const bookList = [];
        bookquerySnapshot.forEach(bookQuery => {
          const book = bookQuery.data();

          if (book.status === 'Available'){
            bookList.push(book);
          }

        })

        // save here
        response.json(bookList);
      })
      .catch(error => {
        response.status(500).send(error);
      })
      
    })
    .catch(error => {
      response.status(500).send(error);
    });


  })
  .catch(error => {
    response.status(500).send(error);
  });
});

app.get('/groups',(request, response) => {

  const { uid } = request.query;

  admin.firestore().collection('usergroups').doc(`${uid}`).get()
  .then(snapshot => {
    const data = snapshot.data();

    const promises = [];

    Object.keys(data).forEach((groupID) => {
      promises.push(
        admin.firestore().collection('groups').doc(`${groupID}`).get()
      );
    })

    Promise.all(promises).then(querySnapshot => {
      const groups = querySnapshot.map(query => {

        const { adminID, createdAt, name } = query.data();

        return {
          adminID,
          createdAt,
          name,
          id: `${query.id}`
        };
      });

      response.json(groups);

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
