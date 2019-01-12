import { List, Record } from 'immutable'
import axios from 'axios'

import { appName, api, developer } from '../conf'

const getUrl = `${api}?developer=${developer}&sort_direction=desc`
const createUrl = `${api}/create/?developer=${developer}`
const editUrl = `${api}/edit/`

const ReducerRecord = Record({
  data: new List(),
  error: null,
  loaded: null,
  count: 0,
})

export const modulName = 'dataStore'
export const FETCH_DATA_REQUEST = `${appName}/${modulName}/FETCH_DATA_REQUEST`
export const FETCH_DATA_SUCCESS = `${appName}/${modulName}/FETCH_DATA_SUCCESS`
export const FETCH_DATA_ERROR = `${appName}/${modulName}/FETCH_DATA_ERROR`
export const CREATE_DATA_REQUEST = `${appName}/${modulName}/CREATE_DATA_REQUEST`
export const CREATE_DATA_SUCCESS = `${appName}/${modulName}/CREATE_DATA_SUCCESS`
export const CREATE_DATA_ERROR = `${appName}/${modulName}/CREATE_DATA_ERROR`
export const EDIT_DATA_REQUEST = `${appName}/${modulName}/EDIT_DATA_REQUEST`
export const EDIT_DATA_SUCCESS = `${appName}/${modulName}/EDIT_DATA_SUCCESS`
export const EDIT_DATA_ERROR = `${appName}/${modulName}/EDIT_DATA_ERROR`

export default (state = new ReducerRecord(), action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_DATA_REQUEST:
      return state.set('loaded', false)

    case FETCH_DATA_SUCCESS:
      if (payload.status !== 'ok') return state.set('error', payload.message)
      return state
        .set('data', payload.message.tasks)
        .set('count', payload.message.total_task_count)
        .set('loaded', true)
        .set('error', false)

    case FETCH_DATA_ERROR:
      const { error } = payload
      return state
        .set('error', error)
        .set('loaded', true)

    case CREATE_DATA_REQUEST:
      return state.set('loaded', false)

    case CREATE_DATA_SUCCESS:
      if (payload.status !== 'ok') return state.set('error', payload.message)
      return state
        .update('data', data => {
          data.unshift(payload.message)
          data.pop()
          return data
        })
        .set('count', payload.message.total_task_count)
        .set('loaded', true)

    default:
      return state
  }
}

export const editData = ({ id, formData }) => async (dispatch) => {
  dispatch({ type: EDIT_DATA_REQUEST })

  try {
    const {
      data: { message, status },
    } = await axios.post(`${editUrl}${id}/?developer=${developer}`, formData)
    dispatch({
      type: EDIT_DATA_SUCCESS,
      payload: { message, status },
    })
  } catch (error) {
    dispatch({
      type: EDIT_DATA_ERROR,
      payload: { error },
    })
  }
}

export const createTask = formData => async dispatch => {
  dispatch({ type: CREATE_DATA_REQUEST })

  try {
    const {
      data: { message, status },
    } = await axios.post(createUrl, formData)
    dispatch({
      type: CREATE_DATA_SUCCESS,
      payload: { message, status },
    })
  } catch (error) {
    dispatch({
      type: CREATE_DATA_ERROR,
      payload: { error },
    })
  }
}

export const fetchData = ({ page=1, sortBy='id' }) => async (dispatch) => {
  dispatch({ type: FETCH_DATA_REQUEST })

  try {
    const {
      data: { message, status },
    } = await axios.get(`${getUrl}&sort_field=${sortBy}&page=${page}`)
    dispatch({
      type: FETCH_DATA_SUCCESS,
      payload: { status, message },
    })
  } catch (error) {
    dispatch({
      type: FETCH_DATA_ERROR,
      payload: { error },
    })
  }
}