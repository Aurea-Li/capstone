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
    const requestList = this.state.requests.map((request,i) => {
      return <li key={i}>{request.title}</li>
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
