import http from './broker.js'

export const generateQrcode = (params = {}) => {
  return http.post('Sys/generateQrcode', params)
}

export const getHomeMenu = (params = {}) => {
  return http.get('Sys/getHomeMenu', params)
}
