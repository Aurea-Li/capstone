import React from 'react'

const Item = ({ item, removeItem }) => {

  const { title, authors, img } = item;

  return (
    <div className="container">
    <h3>{title}</h3>
    <h4>{authors.join()}</h4>
    <img src={img} alt={title} />
    <button onClick={() => removeItem(item)}> Remove </button>
  </div>
  )
}

export default Item
