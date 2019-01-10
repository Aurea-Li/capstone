const {
  db
} = require('../../admin');

const createGroupUsers = ((userID, groupID) => {
  return db.collection('groupusers').doc(`${groupID}`).set({
    [`${userID}`]: true
  });
});

const groupCreated = (doc, context) => {

    const userID = doc.data().adminID;
    const { groupID } = context.params;


    db.collection('usergroups').doc(`${userID}`).update({
      [`${groupID}`]: true
    });

    return createGroupUsers(userID, groupID);

};

module.exports = groupCreated;
