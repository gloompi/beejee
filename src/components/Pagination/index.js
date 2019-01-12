import React, { Component } from 'react'
import { connect } from 'react-redux'

import './style.scss'
import { fetchData } from '../../ducks/dataStore'
import { range } from '../../helpers'

class Pagination extends Component {
  state = {
    activePage: 1
  }

  render() {
    const { count } = this.props
    const { activePage } = this.state
    const paginationList = range(Math.ceil(count / 3))
    const start = activePage < 3 ? 0 : activePage - 3
    const end = activePage > paginationList.length - 3
      ? paginationList.length
      : activePage + 3
    return (
      <ul className='pagination__list'>
        {paginationList.slice(start, end).map(page => (
          <li key={page} className='pagination__item'>
            <button
              className={`pagination__button ${activePage === page ? 'active' : ''}`}
              onClick={() => this.handleClick(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    )
  }

  handleClick = page => {
    const { fetchData } = this.props
    this.setState({ activePage: page })
    fetchData({ page })
  }
}

export default connect(
  ({ dataStore }) => ({ count: dataStore.count }), 
  ({ fetchData })
)(Pagination)
