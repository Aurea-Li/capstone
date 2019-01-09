import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import GroupLinks from '../groups/GroupLinks'
import GroupPage from '../groups/GroupPage'
import axios from 'axios'

class Dashboard extends Component {

  state = {
    activeGroup: false,
    groups: []
  };

  componentDidMount() {
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

  selectGroup = (group) => {

    this.setState({
      activeGroup: group
    });
  }

  render () {

    const { activeGroup , groups } = this.state;
    const { auth } = this.props;


    if (!auth.uid) { return <Redirect to='/frontpage' /> }

      return (
        <div>
          <Navbar />
          This is the Dashboard.
          <GroupLinks
            groups={groups}
            selectGroup={(group) => this.selectGroup(group)} />
          { activeGroup ? <GroupPage group={activeGroup}/> : null }
        </div>
      )

    }
  }

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}


export default connect(mapStateToProps)(Dashboard)
