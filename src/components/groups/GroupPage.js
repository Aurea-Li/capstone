import React from 'react'

const GroupPage = ({ group }) => {
  console.log('inside grouppage',group);
  return (
    <div>
    <h3>{group.name}</h3>

    <section>
    <h4>Members</h4>
    
    </section>
    </div>
  )
}

export default GroupPage
