import React from 'react'

const AvailableBook = ({ bookInfo, requestExistingBook }) => {

  return (
    <div>
    <h5>{bookInfo.book.title}</h5>


      <p>Owned by: {bookInfo.user.firstName} {bookInfo.user.lastName}</p>

      <button onClick={requestExistingBook}>Request Book</button>

    </div>
  )
}

export default AvailableBook
