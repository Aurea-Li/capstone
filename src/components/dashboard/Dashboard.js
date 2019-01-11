import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import GroupLinks from '../groups/GroupLinks'
import GroupPage from '../groups/GroupPage'
import axios from 'axios'
import { leaveGroup } from '../../store/actions/groupActions'

class Dashboard extends Component {

  state = {
    activeGroup: false,
    groups: []
  };

  getGroups() {
    const { uid } = this.props.auth;

    const URL = `https://us-central1-al-capstone.cloudfunctions.net/app/groups?uid=${uid}`;

    axios.get(URL)
    .then(response => {

      this.setState({
        groups: response.data,
        activeGroup: response.data[0] });
    })
    .catch(error => {
      console.log('Error in Dashboard getting groups', error.message);
    });
  }

  componentDidMount() {
    this.getGroups();
  }

  selectGroup = (group) => {

    this.setState({
      activeGroup: group
    });
  }

  render () {

    const { activeGroup , groups } = this.state;
    const { auth, leaveGroup } = this.props;


    if (!auth.uid) { return <Redirect to='/frontpage' /> }

      if (!activeGroup){
        return (
          <div>
            <p>Loading...</p>
          </div>
        )
      } else {

        return (
          <div>
            <Navbar />
            This is the Dashboard.
            <GroupLinks
              groups={groups}
              selectGroup={(group) => this.selectGroup(group)} />
            { activeGroup ? <GroupPage
              group={activeGroup}
              leaveGroup={() => leaveGroup(activeGroup)} /> : null }
          </div>
        )
      }

    }
  }

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    leaveGroup: (group) => dispatch(leaveGroup(group))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
