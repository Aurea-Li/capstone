import React from 'react'
import moment from 'moment'

const BookRequest = ({ requestInfo, fulfillRequest }) => {

  const createdAt = new Date(requestInfo.request.createdAt);

  return (
    <div>

    <h5>{requestInfo.request.title}</h5>

      <p>Requested by: {requestInfo.user.firstName} {requestInfo.user.lastName}</p>

      <p>{moment(createdAt).calendar()}</p>

      <button onClick={fulfillRequest}>Fulfill Request</button>

    </div>
  )
}

export default BookRequest
