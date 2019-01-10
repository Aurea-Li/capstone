const {
  db
} = require('../../admin');

const createUserGroups = ((uid) => {
  return db.collection('usergroups').doc(`${uid}`).set({
  });
});

const userJoined = user => {

    return db.collection('users')
    .doc(user.uid).get().then(doc => {

      return createUserGroups(user.uid);
    });

};

module.exports = userJoined;
