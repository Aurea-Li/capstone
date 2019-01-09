import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { joinGroup } from '../../store/actions/groupActions'
import Navbar from '../layout/Navbar'

const  JoinGroup = ({ auth, groups, joinGroup, groupError }) => {


  if (!auth.uid) return <Redirect to='/frontpage' />

  const groupList = groups && groups.map((group, i) => {
    return <li key={i} onClick={() => joinGroup(group)} >{group.name}</li>
  })

  return (
    <div>
      <Navbar />
      <section>
      { groupError ? groupError : null}
      </section>
      <h2>Available Groups</h2>
      <ul>
        {groupList}
      </ul>
    </div>
  );

}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    groups: state.firestore.ordered.groups,
    groupError: state.group.groupError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    joinGroup: (group) => dispatch(joinGroup(group))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    { collection: 'groups' }
  ])
)(JoinGroup)
