import React from 'react'
import { NavLink } from 'react-router-dom'

const GroupLinks = ({ groups, selectGroup }) => {

  const groupList = groups && groups.map((group,i) => {
    return (<li key={i} onClick={() => selectGroup(group)}>{group.name}</li>)
  });

  return (
    <div>
    <h3>Group Links</h3>

    <section>
      <ul>
        <li><NavLink to='/creategroup'>Create Group</NavLink></li>
        <li><NavLink to='/joingroup'>Join Group</NavLink></li>
        {groupList}
      </ul>
    </section>
    </div>
  )
}

export default GroupLinks
