import React from 'react'
import BorrowedBook from './BorrowedBook'

const BorrowedBooks = ({ books }) => {

  const bookList = books && books.map((book,i) => {
    return (<BorrowedBook key={i} bookInfo={book} />)
  })

  return (
    <div>
    <h2>Borrowed Books</h2>
      {bookList}
    </div>
  )
}

export default BorrowedBooks
