import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import AvailableBooks from './AvailableBooks'
import BookRequests from './BookRequests'
import { getMembers } from '../../store/actions/authActions'
import { requestExistingBook } from '../../store/actions/requestActions'

class GroupPage extends Component {

  getGroupMembers() {
    const groupID = this.props.group.id;
    const URL = `https://us-central1-al-capstone.cloudfunctions.net/app/members?groupID=${groupID}`;

    axios.get(URL)
    .then(response => {
      this.props.getMembers(response.data);

    })
    .catch(error => {
      console.log('Error in getGroupMembers', error.message);
    });

  }

  componentDidMount() {
    this.getGroupMembers();
  }

  componentDidUpdate(prevProps) {

    if (prevProps.group !== this.props.group){
      this.getGroupMembers();
    }
  }

  render () {

    const memberList = this.props.members && this.props.members.map((member,i) => {
      return <li key={i}>{member.name}</li>
    })

    const { group, requestExistingBook } = this.props;
    return (
      <div>
      <h3>{group.name}</h3>

      <button onClick={this.props.leaveGroup}>Leave Group</button>

      <section>
      <h4>Members</h4>
      <ul>
        {memberList}
      </ul>
      </section>

      <section>
        <BookRequests groupID={group.id}/>
      </section>

      <section>
        <AvailableBooks groupID={group.id} requestExistingBook={requestExistingBook}/>
      </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    members: state.auth.members
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMembers: (groups) => dispatch(getMembers(groups)),
    requestExistingBook: (book) => dispatch(requestExistingBook(book))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage)
