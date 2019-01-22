import React from 'react'

const AvailableBook = ({ bookInfo, requestExistingBook }) => {

  return (
    <div>
    <h5>{bookInfo.book.title}</h5>
    <h6 className="authors">{bookInfo.book.authors.join('')}</h6>

      <p>Owned by: {bookInfo.user.firstName} {bookInfo.user.lastName}</p>
      <img className="dashboard-book-img" src={bookInfo.book.img} alt={bookInfo.book.title} />

      <button className="btn btn-primary" onClick={requestExistingBook}>Request Book</button>

    </div>
  )
}

export default AvailableBook
