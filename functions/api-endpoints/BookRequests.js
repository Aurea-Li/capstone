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

      let requestInfo = [];
      querySnapshot.forEach(query => {

        const userData = query.data();
        console.log('userData', userData);

        userData.requests.forEach(requestID => {
          requestInfo.push({
            user: userData,
            request: requestID
          });
        });
      })

      const requestPromises = [];
      requestInfo.forEach(request => {
        requestPromises.push(
          db.collection('requests').doc(`${request.request}`).get()
        )
      })

      Promise.all(requestPromises).then(requestquerySnapshot => {


        let index = 0;
        requestquerySnapshot.forEach(requestQuery => {
          const request = requestQuery.data();

          request.id = requestQuery.id;

          requestInfo[index].request = request;

          index++;
        })

        // save here
        response.json(requestInfo);
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
