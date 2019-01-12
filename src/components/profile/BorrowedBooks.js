import React from 'react'
import Item from '../dashboard/Item'

const BorrowedBooks = ({ books }) => {

  const bookList = books && books.map((book,i) => {
    return (<Item key={i} item={book} />)
  })

  return (
    <div>
    <h2>Borrowed Books</h2>
    <ul>
      {bookList}
    </ul>
    </div>
  )
}





export default BorrowedBooks
