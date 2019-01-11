const {
  db
} = require('../admin');


const borrowedBooks = (request, response) => {

  const uid = request.query.uid;

  let books = [];
  db.collection('books').where("borrowerID", "==", uid).get().then(querySnapshot => {

    console.log('inside query wheee');
    querySnapshot.forEach(query => {
      console.log('inside foreach', query.data());

      books.push(query.data());
    })
    response.json(books);
  })
  .catch(error => {
    response.status(500).send({ error: 'borrowedbooks api call failed' })
  });
}

module.exports = borrowedBooks;
