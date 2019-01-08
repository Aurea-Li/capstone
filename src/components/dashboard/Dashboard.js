import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import GroupLinks from '../groups/GroupLinks'

const Dashboard = (props) => {

  const { auth } = props;
  if (!auth.uid) return <Redirect to='/frontpage' />

  return (
    <div>
      <Navbar />
      This is the Dashboard.
      <GroupLinks />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}


export default connect(mapStateToProps)(Dashboard)
