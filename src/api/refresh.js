import http from './broker.js'

export const RefreshToken = (params = {}) => {
  return http.post('Auth/RefreshToken', params, { custom: { refresh: true } })
}
