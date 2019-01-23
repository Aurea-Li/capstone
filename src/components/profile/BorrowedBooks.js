import React from 'react'
import BorrowedBook from './BorrowedBook'

const BorrowedBooks = ({ books }) => {

  books && books.sort((a, b) => a.book.title.localeCompare(b.book.title));

  const bookList = books && books.map((book,i) => {
    return (<BorrowedBook key={i} bookInfo={book} />)
  })

  return (
    <section className="borrowed-books">
    <h2>Borrowed Books</h2>
      {bookList}
    </section>
  )
}

export default BorrowedBooks
