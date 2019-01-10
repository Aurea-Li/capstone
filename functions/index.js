const functions = require('firebase-functions');

const {
  app,
  db
} = require('./admin');

const groupCreated = require('./database-triggers/group/groupCreated')
const userJoined = require('./database-triggers/user/userJoined')
const bookCreated = require('./database-triggers/book/bookCreated')
const bookDeleted = require('./database-triggers/book/bookDeleted')
const requestCreated = require('./database-triggers/request/requestCreated')
const requestDeleted = require('./database-triggers/request/requestDeleted')

module.exports = {
  'groupCreated': functions.firestore
    .document('groups/{groupID}')
    .onCreate(groupCreated),
  'userJoined': functions.auth
    .user()
    .onCreate(userJoined),
  'bookCreated': functions.firestore
    .document('books/{bookID}')
    .onCreate(bookCreated),
  'bookDeleted': functions.firestore
    .document('books/{bookID}')
    .onDelete(bookDeleted),
  'requestCreated': functions.firestore
    .document('requests/{requestID}')
    .onCreate(requestCreated),
  'requestDeleted': functions.firestore
    .document('requests/{requestID}')
    .onDelete(requestDeleted)
};


app.get('/members',(request, response) => {

  const groupID = request.query.groupID;

  db.collection('groupusers').doc(`${groupID}`).get()
  .then(snapshot => {
    const data = snapshot.data();

    const promises = [];

    Object.keys(data).forEach((userID) => {
      promises.push(
        db.collection('users').doc(`${userID}`).get()
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

  db.collection('groupusers').doc(`${groupID}`).get()
  .then(snapshot => {
    const data = snapshot.data();

    const promises = [];

    Object.keys(data).forEach((userID) => {
      promises.push(
        db.collection('users').doc(`${userID}`).get()
      );
    })

    Promise.all(promises).then(querySnapshot => {

      let bookIDs = [];
      querySnapshot.forEach(query => {

        const userData = query.data();

        userData.books.forEach(book => {
          bookIDs.push(book);
        });
      })

      const bookPromises = [];
      bookIDs.forEach(bookID => {
        bookPromises.push(
          db.collection('books').doc(`${bookID}`).get()
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
        response.status(500).send({ error: 'first promise failed' });
      })

    })
    .catch(error => {
      response.status(500).send({
        error: 'second promise failed -2:30 )',
        data: data
      });
    });


  })
  .catch(error => {
    response.status(500).send({ error: 'third promise failed' });
  });
});


app.get('/groups',(request, response) => {

  const { uid } = request.query;

  db.collection('usergroups').doc(`${uid}`).get()
  .then(snapshot => {
    const data = snapshot.data();

    const promises = [];

    Object.keys(data).forEach((groupID) => {
      promises.push(
        db.collection('groups').doc(`${groupID}`).get()
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
