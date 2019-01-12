import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'
import './App.scss'

import Menu from './components/Menu'
import AddCardForm from './components/Menu/AddCardForm'
import SignInForm from './components/SignIn'
import List from './components/List'

class App extends Component {
  state = {
    addCard: false,
    admin: false,
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className='app'>
            <header className='app__header'>
              <h1 className='app__title'>Task Manager</h1>
              <aside className='app__menu'>
                <Menu handleClick={this.handleClick} />
              </aside>
            </header>
            <AddCardForm
              open={this.state.addCard}
              handleClick={this.handleClick}
            />
            <SignInForm
              open={this.state.admin}
              handleClick={this.handleClick}
            />
            <Route path='/' exact component={List} />
          </div>
        </Provider>
      </Router>
    )
  }

  handleClick = (name, value) => {
    this.setState(state => ({ ...state, [name]: value }))
  }
}

export default App
