import React from 'react'
import { NavLink } from 'react-router-dom'

const GroupLinks = ({ groups }) => {

  const groupList = groups && groups.map((group,i) => {
    return (<li key={i}>{group.name}</li>)
  });

  return (
    <div>
    <h3>Group Links </h3>

    <section>
      <ul>
        <li><NavLink to='/creategroup'>Create Group</NavLink></li>
        {groupList}
      </ul>
    </section>
    </div>
  )
}

export default GroupLinks
