import React, { Component } from 'react'
import axios from 'axios'
import AvailableBook from './items/AvailableBook'

class AvailableBooks extends Component {

  state = {
    books: []
  }

  getAvailableBooks() {

    const { groupID } = this.props;
    const URL = `https://us-central1-al-capstone.cloudfunctions.net/app/availablebooks?groupID=${groupID}`;

    axios.get(URL)
    .then(response => {
      this.setState({ books: response.data  });
    })
    .catch(error => {
      console.log('Error in available books', error.message);
    });

  }

  componentDidMount() {
    this.getAvailableBooks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.groupID !== this.props.groupID){
      this.getAvailableBooks();
    }
  }

  render () {
    const { books } = this.state;
    const bookList = books.map((bookInfo,i) => {
      return (
        <li key={i}>
          <AvailableBook bookInfo={bookInfo} />
        </li>
      )
    });


    return (
      <div>
        <h4>Available Books </h4>
        <ul>
          {bookList}
        </ul>
      </div>
    )
  }
}

export default AvailableBooks
