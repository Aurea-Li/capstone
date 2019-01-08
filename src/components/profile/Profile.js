import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Navbar from '../layout/Navbar'
import Library from './Library'
import BookRequests from './BookRequests'
import { addBook, removeBook } from '../../store/actions/bookActions'
import {addRequest, removeRequest } from '../../store/actions/requestActions'


const Profile = (props) => {

  const { auth, books, requests, addBook, removeBook, addRequest, removeRequest } = props;
  if (!auth.uid) return <Redirect to='/frontpage' />
  return (
    <div>
      <Navbar />
      <Library books={books} addBook={addBook} removeBook={removeBook} />

      <BookRequests requests={requests}
        addRequest={addRequest}
        removeRequest={removeRequest}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    books: state.firestore.ordered.books,
    requests: state.firestore.ordered.requests
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (book) => dispatch(addBook(book)),
    removeBook: (book) => dispatch(removeBook(book)),
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
