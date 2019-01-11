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

      let allBookInfo = [];
      querySnapshot.forEach(query => {

        const userData = query.data();

        userData.books.forEach(bookID => {
          allBookInfo.push({
            user: userData,
            book: bookID
          });
        });
      })

      const bookPromises = [];
      allBookInfo.forEach(book => {
        bookPromises.push(
          db.collection('books').doc(`${book.book}`).get()
        )
      })

      Promise.all(bookPromises).then(bookquerySnapshot => {

        let index = 0;
        let bookInfo = [];
        bookquerySnapshot.forEach(bookQuery => {
          const book = bookQuery.data();

          if (book.status === 'Available'){

            allBookInfo[index].book = book;
            bookInfo.push(allBookInfo[index]);
          }
          index++;
        })

        // save here
        response.json(bookInfo);
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

module.exports = availableBooks;
