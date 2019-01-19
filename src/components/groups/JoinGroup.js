import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { joinGroup } from '../../store/actions/groupActions'
import Navbar from '../layout/Navbar'
import './JoinGroup.css'

class JoinGroup extends Component {

  joinGroup = (group) => {
    this.props.joinGroup(group);
  }

  render() {

    const { auth, groups } = this.props;

    if (!auth.uid) return <Redirect to='/frontpage' />

    const groupList = groups && groups.map((group, i) => {
      return <li key={i} onClick={() => this.joinGroup(group)} >{group.name}</li>
    })

    return (
      <div className="joingroup">
        <Navbar />
        <h2>Available Groups</h2>
        <ul className="grouplist">
          {groupList}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    groups: state.firestore.ordered.groups,
    errorMessage: state.errorMessage
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
