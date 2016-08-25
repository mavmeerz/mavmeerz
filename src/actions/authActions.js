import Axios from 'axios'

export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export function signup (signupData) {
  const request = Axios.post('v1/api/signup', signupData)
  return {
    type: SIGNUP,
    payload: request
  }
}
export function login (loginData) {
  const request = Axios.post('v1/api/login', loginData)
  return {
    type: LOGIN,
    payload: request
  }
}

export function logout() {
  return {
    type: LOGOUT
  };
}
