import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import './Navbar.css'

const Navbar = (props) => {
  const { profile } = props;

  return (
    <nav className="navbar">
      <li><NavLink to='/'>DASHBOARD</NavLink></li>
      <li><NavLink to='/profile'>PROFILE</NavLink></li>
      <li onClick={props.signOut} className="signout-link"> LOG OUT </li>
      <li className="user-name">Welcome {profile.firstName} {profile.lastName}</li>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
