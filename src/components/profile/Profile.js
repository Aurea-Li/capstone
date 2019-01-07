import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import Library from './Library'
import BookRequests from './BookRequests'
import { addBook } from '../../store/actions/bookActions'


const Profile = (props) => {
  const { auth, books, addBook } = props;
  if (!auth.uid) return <Redirect to='/frontpage' />
  return (
    <div>
      <Navbar />
      This is the Profile.
      <Library books={books} addBook={addBook}/>
      <BookRequests />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    books: state.firestore.ordered.books,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (book) => dispatch(addBook(book))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'books' }
  ])
)(Profile)
