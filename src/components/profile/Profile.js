import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Navbar from '../layout/Navbar'

const Profile = (props) => {
  const { auth } = props;
  if (!auth.uid) return <Redirect to='/frontpage' />
  return (
    <div>
      <Navbar />
      This is the Profile.
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps)(Profile)
