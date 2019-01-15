import React from 'react'
import moment from 'moment'

const Item = ({ item, removeItem, returnBook }) => {

  const { title, authors, img } = item;


  const status = item.status ? <p>Status: {item.status}</p> : null;

  let borrowerInfo, returnBookButton;
  if (item.borrowerID){

    borrowerInfo = <p>Borrowed by: {item.borrowerFirstName} {item.borrowerLastName} on {moment(new Date(item.borrowedDate.seconds * 1000)).calendar()}</p>;
    returnBookButton = <button onClick={returnBook}>Book Returned</button>
  }


  return (
    <div className="container">
    <h3>{title}</h3>
    <h4>{authors.join(', ')}</h4>
    <img src={img} alt={title} />

    <div>
    {status}
    {borrowerInfo}
      <button onClick={() => removeItem(item)}> Remove </button>
      {returnBookButton}
    </div>

  </div>
  )
}

export default Item
