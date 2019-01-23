import React from 'react'
import moment from 'moment'

const BookRequest = ({ requestInfo, fulfillRequest }) => {

  const createdAt = new Date(requestInfo.request.createdAt);

  return (
    <div>

    <h5>{requestInfo.request.title}</h5>
    <h6 className="authors">{requestInfo.request.authors.join(', ')}</h6>
      <p>Requested by: {requestInfo.user.firstName} {requestInfo.user.lastName} <br />
      </p>

      <img className="dashboard-book-img" src={requestInfo.request.img} alt={requestInfo.request.title} />
      <button className="btn btn-primary" onClick={fulfillRequest}>Fulfill Request</button>

      <p className="request-date">{moment(createdAt).calendar()}</p>
    </div>
  )
}

export default BookRequest
