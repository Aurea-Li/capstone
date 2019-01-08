import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const Navbar = (props) => {
  return (
    <ul>
      <li><NavLink to='/'>Dashboard</NavLink></li>
      <li>
        <a onClick={props.signOut}> Log Out </a>
      </li>
      <li><NavLink to='/profile'>Profile</NavLink></li>
    </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(Navbar)
