import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import './style.scss'
import { createTask } from '../../ducks/dataStore'

const inputs = [
  {
    key: 'username',
    name: 'UserName'
  },
  {
    key: 'email',
    name: 'Email'
  },
  {
    key: 'text',
    name: 'Text'
  },
]

class AddCardForm extends Component {
  constructor(props) {
    super(props)

    this.form = React.createRef()

    const state = { warning: false }
    inputs.forEach(({ key }) => {
      state[key] = ''
    })
    this.state = state
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside)
  }

  render() {
    const { open, handleClick } = this.props
    const { warning } = this.state
    return (
      <div className={`add-card ${open ? 'active' : ''}`}>
        <form ref={this.form} className='add-card__form'>
          {warning && <h3 style={{ color: 'red' }}>All fields must be filled in</h3>}
          {inputs.map(({ key, name }) => {
            if (key === 'text') return (
              <textarea
                key={key}
                className={`add-card__input ${key}`}
                name={key}
                value={this.state[key]}
                placeholder={name}
                onChange={this.handleChange(key)}
              />
            )
            return (
              <input
                key={key}
                className={`add-card__input ${key}`}
                name={key}
                type={key === 'email' ? 'email' : 'text'}
                value={this.state[key]}
                placeholder={name}
                onChange={this.handleChange(key)}
              />
            )
          })}
          <button
            className='add-card__btn'
            onClick={this.handleSubmit}
          >
            Add Task
          </button>
        </form>
        <button
          className='add-card__close'
          onClick={() => handleClick('addCard', false)}
        >
          &times;
        </button>
      </div>
    )
  }

  handleSubmit = e => {
    e.preventDefault()

    let isNotValid = false
    const { createTask } = this.props
    const form = new FormData()
    inputs.forEach(({ key }) => {
      if (isEmpty(this.state[key])) {
        isNotValid = true
        this.setState(state => ({ ...state, warning: true }))
      }
      form.append(key, this.state[key])
    })

    if (isNotValid) return null
    this.setState(state => ({ ...state, warning: false }))
    createTask(form)
    this.props.handleClick('addCard', false)
  }

  handleClickOutside = (e) => {
    if (!this.form.current.contains(e.target)) {
      this.props.handleClick('addCard', false)
    }
  }

  handleChange = name => e => {
    const { value } = e.target
    this.setState(state => ({ ...state, [name]: value }))
  }
}

export default connect(null, ({ createTask }))(AddCardForm)