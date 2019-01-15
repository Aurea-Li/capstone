import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import GroupLinks from '../groups/GroupLinks'
import GroupPage from '../groups/GroupPage'
import axios from 'axios'
import { leaveGroup, getGroups } from '../../store/actions/groupActions'
import './Dashboard.css'

class Dashboard extends Component {

  state = {
    activeGroup: false
  };

  componentDidMount() {
    console.log('component mounting');
    const { uid } = this.props.auth;

    const URL = `https://us-central1-al-capstone.cloudfunctions.net/app/groups?uid=${uid}`;
    axios.get(URL)
    .then(response => {


      this.props.getGroups(response.data);

      this.setState({ activeGroup: response.data[0] });
      console.log('groups gotten');

    })
    .catch(error => {
      console.log('Error in Dashboard getting groups', error.message);
    });
  }

  componentDidUpdate(prevProps) {

    if (prevProps.groups !== this.props.groups){
      this.setState({
        activeGroup: this.props.groups[0]
      });
    }
  }

  selectGroup = (group) => {

    this.setState({
      activeGroup: group
    });
  }

  leaveGroup = (group) => {
    this.props.leaveGroup(group);
  }

  render () {

    const { activeGroup } = this.state;
    const { auth, groups } = this.props;

    if (!auth.uid) { return <Redirect to='/frontpage' /> }

    if (!activeGroup){
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    } else {

      return (
        <div className="dashboard">
          <Navbar />
          <GroupLinks
            groups={groups}
            selectGroup={(group) => this.selectGroup(group)} />


            { activeGroup ? <GroupPage
              group={activeGroup}
              leaveGroup={() => this.leaveGroup(activeGroup)} /> : null }
          </div>
        )
      }

    }
  }

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    groups: state.group.groups
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    leaveGroup: (group) => dispatch(leaveGroup(group)),
    getGroups: (groups) => dispatch(getGroups(groups))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
