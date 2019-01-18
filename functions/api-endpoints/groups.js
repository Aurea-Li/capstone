const {
  db
} = require('../admin');

const groups = (request, response) => {

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
  // user not found
  .catch(error => {
    response.json([]);
  });

}


module.exports = groups;
