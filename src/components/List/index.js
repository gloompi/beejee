import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import './style.scss'
import { fetchData } from '../../ducks/dataStore'
import EditableItem from './EditableItem'
import Pagination from '../Pagination'

class List extends Component {
  componentDidMount = () => {
    const { fetchData, loaded } = this.props
    if (!loaded) fetchData({})
  }
  
  render() {
    const { signed, data, loaded, error } = this.props

    if (error) return <h2>Error while retrieving data!</h2>
    return (
      <Fragment>
        {
          loaded
            ? <ul className='list'>
                {data.map((props) => {
                  const {
                    id,
                    status,
                  } = props
                  return <li
                    key={id}
                    className={`list__item ${`${status}` === '10' ? 'done' : ''}`}
                  >
                    <EditableItem
                      signed={signed}
                      {...props}
                    />
                  </li>
                })}
              </ul>
            : <h2>Loading...</h2>
        }
        <Pagination />
      </Fragment>
    )
  }
}

export default connect(({ dataStore, auth }) => ({
  signed: auth.signed,
  data: dataStore.data,
  loaded: dataStore.loaded,
  error: dataStore.error,
}), ({ fetchData }))(List)
