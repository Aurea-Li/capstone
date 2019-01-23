import React from 'react'
import moment from 'moment'

const Item = ({ item, removeItem, returnBook }) => {

  const { title, authors, img } = item;


  const status = item.status ? <p>Status: {item.status}</p> : null;

  let borrowerInfo, returnBookButton;
  if (item.borrowerID){

    borrowerInfo = <p>Borrowed by: {item.borrowerFirstName} {item.borrowerLastName} on {moment(new Date(item.borrowedDate.seconds * 1000)).calendar()}</p>;
    returnBookButton = <button className="btn btn-primary" onClick={returnBook}>Book Returned</button>
  }


  return (
    <div className="item">
    <h3>{title}</h3>
    <h4 className="profile-authors">{authors.join(', ')}</h4>
    <img src={img} alt={title} />

    <div className="status">
    {status}
    {borrowerInfo}
      <button className="btn btn-primary" onClick={() => removeItem(item)}> Remove </button>
      {returnBookButton}
    </div>

  </div>
  )
}

export default Item
