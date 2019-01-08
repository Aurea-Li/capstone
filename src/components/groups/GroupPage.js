import React from 'react'

const GroupPage = ({ group }) => {
  console.log('inside grouppage',group);
  return (
    <div>
    <h3>{group.name}</h3>

    </div>
  )
}

export default GroupPage
