const {
  db
} = require('../admin');


const availableBooks = (request, response) => {

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

      let bookIDs = [];
      querySnapshot.forEach(query => {

        const userData = query.data();

        userData.books.forEach(book => {
          bookIDs.push(book);
        });
      })

      const bookPromises = [];
      bookIDs.forEach(bookID => {
        bookPromises.push(
          db.collection('books').doc(`${bookID}`).get()
        )
      })

      Promise.all(bookPromises).then(bookquerySnapshot => {

        const bookList = [];
        bookquerySnapshot.forEach(bookQuery => {
          const book = bookQuery.data();

          if (book.status === 'Available'){
            bookList.push(book);
          }

        })

        // save here
        response.json(bookList);
      })
      .catch(error => {
        response.status(500).send({ error: 'first promise failed' });
      })

    })
    .catch(error => {
      response.status(500).send({
        error: 'second promise failed -2:30 )',
        data: data
      });
    });


  })
  .catch(error => {
    response.status(500).send({ error: 'third promise failed' });
  });
}

module.exports = availableBooks;
