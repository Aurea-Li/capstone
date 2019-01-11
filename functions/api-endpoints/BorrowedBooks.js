const {
  db
} = require('../admin');


const borrowedBooks = (request, response) => {

  const userID = request.query.userID;

  db.collection('books').where("borrowerID", "==", `${userID}`).then(snapshot => {
    const data = snapshot.data();

    response.json(data);
  })

}

module.exports = borrowedBooks;
