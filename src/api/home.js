import http from './broker.js'

export const getTabList = (params = {}) => {
  return http.get('Home/getTabList', params)
}
