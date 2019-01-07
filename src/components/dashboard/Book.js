import React from 'react'

const Book = ({ book, removeBook }) => {
  return (
    <div className="container">
    <h3>{book.title}</h3>
    <button onClick={() => removeBook(book)}> Remove </button>
  </div>
  )
}

export default Book
