import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import BookRequest from './items/BookRequest'
import { getRequests } from '../../store/actions/requestActions'

class BookRequests extends Component {

  getBookRequests() {

    const { groupID } = this.props;
    const URL = `https://us-central1-al-capstone.cloudfunctions.net/app/bookrequests?groupID=${groupID}`;

    axios.get(URL)
    .then(response => {
      this.props.getRequests(response.data);
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
    const { requests } = this.props;
    const requestList = requests && requests.map((requestInfo,i) => {
      return (
        <li key={i}>
          <BookRequest requestInfo={requestInfo} />
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

const mapStateToProps = (state) => {
  return {
    requests: state.request.requests
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRequests: (groups) => dispatch(getRequests(groups)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookRequests)
