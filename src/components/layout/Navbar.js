import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import './Navbar.css'

const Navbar = (props) => {
  return (
    <ul className="navbar">
      <li><NavLink to='/'>DASHBOARD</NavLink></li>
      <li><NavLink to='/profile'>PROFILE</NavLink></li>
      <li onClick={props.signOut}> LOG OUT </li>
    </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(Navbar)
