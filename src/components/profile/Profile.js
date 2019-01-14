import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import Library from './Library'
import BookRequests from './BookRequests'
import BorrowedBooks from './BorrowedBooks'
import { addBook, removeBook, getBorrowedBooks } from '../../store/actions/bookActions'
import {addRequest, removeRequest } from '../../store/actions/requestActions'


class Profile extends Component {

  componentDidMount() {
    const { uid } = this.props.auth;

    const URL = `https://us-central1-al-capstone.cloudfunctions.net/app/borrowedbooks?uid=${uid}`;

    axios.get(URL)
    .then(response => {
      this.props.getBorrowedBooks(response.data);
    })
    .catch(error => {
      console.log('Error in BorrowedBooks', error.message);
    })
  }


  render() {
    const { auth, books, requests, addBook, removeBook, addRequest, removeRequest, borrowedBooks } = this.props;
    if (!auth.uid) return <Redirect to='/frontpage' />
    return (
      <div>
        <Navbar />
        <Library books={books} addBook={addBook} removeBook={removeBook} />

        <BookRequests requests={requests}
          addRequest={addRequest}
          removeRequest={removeRequest}/>
        <BorrowedBooks
          books={borrowedBooks}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    books: state.firestore.ordered.books,
    borrowedBooks: state.book.borrowedBooks,
    requests: state.firestore.ordered.requests
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (book) => dispatch(addBook(book)),
    removeBook: (book) => dispatch(removeBook(book)),
    getBorrowedBooks: (books) => dispatch(getBorrowedBooks(books)),
    addRequest: (request) => dispatch(addRequest(request)),
    removeRequest: (request) => dispatch(removeRequest(request))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => [
    { collection: 'books',
      where: [['userID', '==', props.auth.uid ? props.auth.uid : null ]]},
    { collection: 'requests',
      where: [['userID', '==', props.auth.uid ? props.auth.uid : null ]]}
  ])
)(Profile)
