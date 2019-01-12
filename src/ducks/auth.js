import { Record } from 'immutable'

import { appName } from '../conf'

const ReducerRecord = Record({
  signed: null,
})

export const modulName = 'authentication'
export const SIGNIN_ADMIN = `${appName}/${modulName}/SIGNIN_ADMIN`
export const SIGNOUT_ADMIN = `${appName}/${modulName}/SIGNOUT_ADMIN`

export default (state = new ReducerRecord(), action) => {
  const { type } = action
  switch (type) {
    case SIGNIN_ADMIN:
      localStorage.setItem('auth', true)
      return state.set('signed', true)

    case SIGNOUT_ADMIN:
      localStorage.setItem('auth', false)
      return state.set('signed', false)

    default:
      return state
  }
}

export const signIn = () => ({ type: SIGNIN_ADMIN })
export const signOut = () => ({ type: SIGNOUT_ADMIN })