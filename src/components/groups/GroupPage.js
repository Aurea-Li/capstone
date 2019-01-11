import React, { Component } from 'react'
import axios from 'axios'
import AvailableBooks from './AvailableBooks'
import BookRequests from './BookRequests'

class GroupPage extends Component {

  state = {
    members: []
  }

  getGroupMembers() {
    const groupID = this.props.group.id;
    const URL = `https://us-central1-al-capstone.cloudfunctions.net/app/members?groupID=${groupID}`;

    axios.get(URL)
    .then(response => {
      this.setState({ members: response.data  });
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

    const memberList = this.state.members.map((member,i) => {
      return <li key={i}>{member.name}</li>
    })

    const { group } = this.props;
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
        <AvailableBooks groupID={group.id}/>
      </section>
      </div>
    )
  }
}

export default GroupPage
