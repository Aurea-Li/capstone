import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import GroupLinks from '../groups/GroupLinks'

const Dashboard = (props) => {

  const { auth, groups } = props;
  if (!auth.uid) return <Redirect to='/frontpage' />

  return (
    <div>
      <Navbar />
      This is the Dashboard.
      <GroupLinks groups={groups}/>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    groups: state.firestore.ordered.groups
  }
}


export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    { collection: 'groups' }
  ])
)(Dashboard)
