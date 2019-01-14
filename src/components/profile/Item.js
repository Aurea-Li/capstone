import React from 'react'
import moment from 'moment'

const Item = ({ item, removeItem }) => {

  const { title, authors, img } = item;


  const status = item.status ? <p>Status: {item.status}</p> : null;

  let borrowerInfo;
  if (item.borrowerID){

    borrowerInfo = item.borrowerID ? <p>Borrowed by: {item.borrowerFirstName} {item.borrowerLastName} on {moment(new Date(item.borrowedDate.seconds * 1000)).calendar()}</p> : null;
  }


  return (
    <div className="container">
    <h3>{title}</h3>
    <h4>{authors.join(', ')}</h4>
    <img src={img} alt={title} />

    <div>
    {status}
    {borrowerInfo}
      {removeItem ? <button onClick={() => removeItem(item)}> Remove </button> : null}
    </div>

  </div>
  )
}

export default Item
