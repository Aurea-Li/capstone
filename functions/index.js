const functions = require('firebase-functions');

const {
  app
} = require('./admin');

const groupCreated = require('./database-triggers/group/groupCreated')
const userJoined = require('./database-triggers/user/userJoined')
const bookCreated = require('./database-triggers/book/bookCreated')
const bookDeleted = require('./database-triggers/book/bookDeleted')
const requestCreated = require('./database-triggers/request/requestCreated')
const requestDeleted = require('./database-triggers/request/requestDeleted')

const members = require('./api-endpoints/members')
const availableBooks = require('./api-endpoints/availableBooks')
const groups = require('./api-endpoints/groups')


app.get('/members',members);
app.get('/availablebooks',availableBooks);
app.get('/groups',groups);



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
    .onDelete(requestDeleted),
  'app': functions.https.onRequest(app)
};
