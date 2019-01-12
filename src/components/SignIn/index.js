import React, { Component } from 'react'
import { connect } from 'react-redux'

import './style.scss'
import { adminUsername, adminPassword } from '../../conf'
import { signIn } from '../../ducks/auth'

class SignInForm extends Component {
  constructor(props) {
    super(props)

    this.form = React.createRef()
    this.state = {
      warning: false,
      login: '',
      password: '',
    }
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('auth'))) {
      this.props.signIn()
    }
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
          {warning && <h3 style={{ color: 'red' }}>Login or password is not correct</h3>}
          <input
            className='add-card__input'
            name='login'
            type='text'
            value={this.state.login}
            placeholder={'Login'}
            onChange={this.handleChange('login')}
          />
          <input
            className='add-card__input'
            name='password'
            type='password'
            value={this.state.password}
            placeholder={'Password'}
            onChange={this.handleChange('password')}
          />
          <button
            className='add-card__btn'
            onClick={this.handleSubmit}
          >
            Sign In
          </button>
        </form>
        <button
          className='add-card__close'
          onClick={() => handleClick('admin', false)}
        >
          &times;
        </button>
      </div>
    )
  }

  handleSubmit = e => {
    e.preventDefault()
    const { login, password } = this.state
    const { signIn, handleClick } = this.props
    if (`${password}` === adminPassword && login === adminUsername) {
      signIn()
      handleClick('admin', false)
    } else {
      this.setState(state => ({ ...state, warning: true }))
    }
  }
 
  handleClickOutside = (e) => {
    if (!this.form.current.contains(e.target)) {
      this.props.handleClick('admin', false)
    }
  }

  handleChange = name => e => {
    const { value } = e.target
    this.setState(state => ({ ...state, [name]: value }))
  }
}

export default connect(null, ({ signIn }))(SignInForm)