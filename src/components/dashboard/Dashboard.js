import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import GroupLinks from '../groups/GroupLinks'
import GroupPage from '../groups/GroupPage'
class Dashboard extends Component {

  state = {
    activeGroup: false
  };

  componentDidUpdate = (prevProps) => {

    if (prevProps.groups !== this.props.groups) {
      this.setState({
        activeGroup: this.props.groups[0] });
    }
  }

  selectGroup = (group) => {

    this.setState({
      activeGroup: group
    });
  }

  render () {
    const { activeGroup } = this.state;
    if (activeGroup){

      const { auth, groups } = this.props;
      const { activeGroup } = this.state;


      if (!auth.uid) { return <Redirect to='/frontpage' /> }

        return (
          <div>
            <Navbar />
            This is the Dashboard.
            <GroupLinks
              groups={groups}
              selectGroup={(group) => this.selectGroup(group)} />
            <GroupPage
              group={activeGroup}/>
          </div>
        )
      } else {
        return (
          <div>Loading...</div>
        )
      }
    }

  }

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    groups: state.firestore.ordered.groups
  }
}


export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'groups' }
  ])
)(Dashboard)
