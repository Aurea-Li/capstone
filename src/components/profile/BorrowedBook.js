import React from 'react'
import moment from 'moment'

const BorrowedBook = ({ bookInfo }) => {

  const { book, user } = bookInfo;
  const { title, authors, img, borrowedDate } = book;

  return (
    <div className="borrowed-book">
    <h3>{title}</h3>
    <h4 className="profile-authors">{authors.join(', ')}</h4>
    <img src={img} alt={title} />

    <div>
      <p>Owned by {user}</p>
      <p>Borrowed on {moment(new Date(borrowedDate)).calendar()}</p>
    </div>

  </div>
  )
}

export default BorrowedBook
