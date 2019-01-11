import React from 'react'

const BookRequest = ({ requestInfo }) => {

  return (
    <div>

    <h5>{requestInfo.request.title}</h5>

      <p>Requested by: {requestInfo.user.firstName} {requestInfo.user.lastName}</p>

      <button>Fulfill Request</button>

    </div>
  )
}

export default BookRequest
