import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import rfc3986 from 'rfc-3986'
import md5 from 'md5'

import './style.scss'
import { editData } from '../../ducks/dataStore'

class Editable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: props.text,
      status: props.status
    }
  }
  render() {
    const {
      id,
      username,
      email,
      signed,
    } = this.props
    return (
      <Fragment>
        {signed && (
          <button
            className='list__item-edit'
            onClick={() => this.handleEtid(id)}
          >
            {this.state[id] ? 'Done' : 'Edit'}
          </button>
        )}
        <p><b>User</b>: {username}</p>
        <p><b>Email</b>: {email}</p>
        <p><b>Text</b>: {
          this.state[id]
            ? <input
                value={this.state.text}
                onChange={this.handleChange('text')}
              />
            : this.state.text
          }
        </p>
        {(signed && this.state[id])
          && (
            <p>
              <b>Status</b>:
              <select value={this.state.status} onChange={this.handleChange('status')}>
                <option value='0'>0</option>
                <option value='10'>10</option>
              </select>
            </p>
        )}
      </Fragment>
    )
  }

  handleChange = name => e => {
    const { value } = e.target

    this.setState(state => ({ ...state, [name]: value }))
  }

  handleEtid = (id) => {
    const { editData, status, text } = this.props
    const statusChanged = status !== this.state.status
    const textChanged = text !== this.state.text
    this.setState(state => ({ [id]: !state[id] }))
    if (this.state[id] && (statusChanged || textChanged)) {
      let hash = ''
      const form = new FormData()
      if (statusChanged) {
        const encodedStatus = encodeURI(this.state.status).replace(rfc3986.uri)
        hash = `status=${encodedStatus}`
        form.append('status', this.state.status)
      }
      if (textChanged) {
        const encodedText = encodeURI(this.state.text).replace(rfc3986.uri)
        hash = statusChanged
          ? `${hash}&text=${encodedText}`
          : `text=${encodedText}`
        form.append('text', this.state.text)
      }
      hash = `${hash}&token=beejee`
      const signature = md5(hash)
      form.append('token', 'beejee')
      form.append('signature', signature)
      editData({ id, formData: form })
    }
  }
}

export default connect(null, ({ editData }))(Editable)