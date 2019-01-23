const {
  db
} = require('../admin');


const members = (request, response) => {

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

      names && names.sort((a, b) => a.name.localeCompare(b.name));

      response.json(names);

    })
    .catch(error => {
      response.status(500).send(error);
    });
  })
  .catch(error => {
    response.status(500).send(error);
  });
}

module.exports = members;
