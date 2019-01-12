import React from 'react'

const BorrowedBook = ({ bookInfo }) => {

  const { book, user } = bookInfo;
  const { title, authors, img } = book;

  return (
    <div className="container">
    <h3>{title}</h3>
    <h4>{authors.join(', ')}</h4>
    <img src={img} alt={title} />

    <div>
      <p>Owned by {user}</p>

    </div>

  </div>
  )
}

export default BorrowedBook
