import React from 'react'

const Item = ({ item, removeItem }) => {

  const { title, authors, img } = item;

  const status = item.status ? <p>Status: {item.status}</p> : null;
  const borrowerInfo = item.borrowerID ? <p>Borrowed by: {item.borrowerFirstName} {item.borrowerLastName}</p> : null;

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
