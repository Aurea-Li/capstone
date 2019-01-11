import React, { Component } from 'react'
import axios from 'axios'

class BookRequests extends Component {

  state = {
    requests: []
  }

  getBookRequests() {

    const { groupID } = this.props;
    const URL = `https://us-central1-al-capstone.cloudfunctions.net/app/bookrequests?groupID=${groupID}`;

    axios.get(URL)
    .then(response => {
      this.setState({ requests: response.data  });
    })
    .catch(error => {
      console.log('Error in book requests', error.message);
    });

  }

  componentDidMount() {
    this.getBookRequests();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.groupID !== this.props.groupID){
      this.getBookRequests();
    }
  }

  render () {
    const { requests } = this.state;
    const requestList = requests.map((requestInfo,i) => {
      return (
        <li key={i}>
          <h5>{requestInfo.request.title}</h5>
          <div>
            <p>Requested by: {requestInfo.user.firstName} {requestInfo.user.lastName}</p>
          </div>
        </li>
      )
    });


    return (
      <div>
        <h4>Book Requests </h4>
        <ul>
          {requestList}
        </ul>
      </div>
    )
  }
}

export default BookRequests
