import React from 'react'
import { connect } from 'react-redux'

import './style.scss'
import { fetchData } from '../../ducks/dataStore'
import { signOut } from '../../ducks/auth'

const Menu = ({ handleClick, fetchData, signOut, signed }) => (
  <nav className='mnu'>
    <ul className='mnu__list'>
      <li className='mnu__item'>
        <button
          className='mnu__add-btn'
          onClick={() => handleClick('addCard', true)}
        />
      </li>
      <li className='mnu__item'>
        <select
          className='mnu__sort'
          name='sort'
          onChange={e => fetchData({ sortBy: e.target.value })}
        >
          <option value='id'>None</option>
          <option value='username'>Username</option>
          <option value='email'>Email</option>
          <option value='status'>Status</option>
        </select>
      </li>
      <li className='mnu__item'>
        <button
          className='mnu__admin-btn'
          onClick={() => (
            signed ? signOut() : handleClick('admin', true)
          )}
        >
          {signed ? 'Sign Out' : 'Sign In'}
        </button>
      </li>
    </ul>
  </nav>
)

export default connect(
  ({ auth }) => ({ signed: auth.signed }), 
  ({ fetchData, signOut })
)(Menu)
