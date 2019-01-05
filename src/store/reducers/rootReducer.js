import { combineReducers } from 'redux'
import authReducer from './authReducer'
import bookReducer from './bookReducer'
import groupReducer from './groupReducer'
// import { firestoreReducer } from 'redux-firestore'
// import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
  group: groupReducer,
});

export default rootReducer
