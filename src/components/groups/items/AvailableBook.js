import React from 'react'

const AvailableBook = ({ bookInfo }) => {

  return (
    <div>
    <h5>{bookInfo.book.title}</h5>

    <div>
      <p>Owned by: {bookInfo.user.firstName} {bookInfo.user.lastName}</p>
    </div>

    </div>
  )
}

export default AvailableBook
