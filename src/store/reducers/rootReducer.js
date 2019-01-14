import { combineReducers } from 'redux'
import authReducer from './authReducer'
import bookReducer from './bookReducer'
import groupReducer from './groupReducer'
import requestReducer from './requestReducer'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
  group: groupReducer,
  request: requestReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer
