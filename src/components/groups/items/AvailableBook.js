import React from 'react'

const AvailableBook = ({ bookInfo }) => {

  return (
    <div>
    <h5>{bookInfo.book.title}</h5>


      <p>Owned by: {bookInfo.user.firstName} {bookInfo.user.lastName}</p>

      <button>Request Book</button>

    </div>
  )
}

export default AvailableBook
