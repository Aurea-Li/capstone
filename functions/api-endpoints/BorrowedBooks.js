const {
  db
} = require('../admin');


const borrowedBooks = (request, response) => {

  const uid = request.query.uid;

  let books = [];
  db.collection('books').where("borrowerID", "==", uid).get().then(querySnapshot => {

    querySnapshot.forEach(query => {

      books.push({
        user: query.data().userID,
        book: query.data()
      });

      const promises = [];

      books.forEach(bookInfo => {
        promises.push(
          db.collection('users').doc(`${bookInfo.user}`).get()
        );
      })

      Promise.all(promises).then(querySnapshot => {
        let index = 0;
        querySnapshot.forEach(query => {
          const user = query.data();

          books[index].user = `${user.firstName} ${user.lastName}`;
          index++;

        });

        response.json(books);

      })
      .catch(error => {
        response.status(500).send({ error: 'borrowedbooks api call failed' })
      })

    })
  })
  .catch(error => {
    response.status(500).send({ error: 'borrowedbooks api call failed' })
  });
}

module.exports = borrowedBooks;
