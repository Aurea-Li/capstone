import React from 'react'

const Item = ({ item, removeItem }) => {

  const { title, authors, img } = item;

  return (
    <div className="container">
    <h3>{title}</h3>
    <h4>{authors.join(', ')}</h4>
    <img src={img} alt={title} />

    <div>
      <p>Status: { item.status ? item.status : null }</p>
      {removeItem ? <button onClick={() => removeItem(item)}> Remove </button> : null}
    </div>

  </div>
  )
}

export default Item
