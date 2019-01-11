const {
  db
} = require('../admin');


const bookRequests = (request, response) => {

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

      let requestIDs = [];
      querySnapshot.forEach(query => {

        const userData = query.data();

        userData.requests.forEach(request => {
          requestIDs.push(request);
        });
      })

      const requestPromises = [];
      requestIDs.forEach(requestID => {
        requestPromises.push(
          db.collection('requests').doc(`${requestID}`).get()
        )
      })

      Promise.all(requestPromises).then(requestquerySnapshot => {

        const requestList = [];
        requestquerySnapshot.forEach(requestQuery => {
          const request = requestQuery.data();
          requestList.push(request);
        })

        // save here
        response.json(requestList);
      })
      .catch(error => {
        response.status(500).send({ error: 'first promise failed' });
      })

    })
    .catch(error => {
      response.status(500).send({ error: 'second promise failed' });
    });
  })
  .catch(error => {
    response.status(500).send({ error: 'third promise failed' });
  });
}

module.exports = bookRequests;
