import React from 'react'

const Book = ({ book, removeBook }) => {

  const { title, authors, img } = book;
  
  return (
    <div className="container">
    <h3>{title}</h3>
    <h4>{authors.join()}</h4>
    <img src={img} alt={title} />
    <button onClick={() => removeBook(book)}> Remove </button>
  </div>
  )
}

export default Book
