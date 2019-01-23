import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import AvailableBook from './items/AvailableBook'
import { getBooks } from '../../store/actions/bookActions'
import { requestExistingBook } from '../../store/actions/requestActions'

class AvailableBooks extends Component {

  getAvailableBooks() {

    const { groupID } = this.props;
    const URL = `https://us-central1-al-capstone.cloudfunctions.net/app/availablebooks?groupID=${groupID}`;

    axios.get(URL)
    .then(response => {
      this.props.getBooks(response.data);
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
    const { books } = this.props;

    books && books.sort((a, b) => a.book.title.localeCompare(b.book.title));

    const bookList = books && books.map((bookInfo,i) => {
      return (
        <li key={i}>
          <AvailableBook
            bookInfo={bookInfo}
            requestExistingBook={() => this.props.requestExistingBook(bookInfo.book)}
            />
        </li>
      )
    });

    return (
      <div className="availablebooks">
        <h4>Available Books </h4>
        <ul>
          {bookList}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.book.books
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBooks: (books) => dispatch(getBooks(books)),
    requestExistingBook: (book) => dispatch(requestExistingBook(book))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvailableBooks)
