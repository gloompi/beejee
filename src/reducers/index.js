import { combineReducers } from 'redux'
import auth from '../ducks/auth'
import dataStore from '../ducks/dataStore'

export default combineReducers({
  auth, dataStore
})