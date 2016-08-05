import Axios from 'axios'

export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

const ROOT_URL = 'http://localhost:8080/'

export function signup (signupData) {
  const request = Axios.post('/signup', signupData)
  return {
    type: SIGNUP,
    payload: request
  }
}

export function login (loginData) {
  const request = Axios.post('/login', loginData)
  return {
    type: LOGIN,
    payload: request
  }
}