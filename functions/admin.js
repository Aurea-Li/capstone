const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const db = admin.firestore();

// CORS Express middleware to enable CORS Requests.
const express = require('express');
const app = express();

// [START middleware]
const cors = require('cors')({origin: true});
app.use(cors);
// [END middleware]

module.exports = {
  db,
  admin,
  app
}
