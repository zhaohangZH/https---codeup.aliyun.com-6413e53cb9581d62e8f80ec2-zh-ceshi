import http from './broker.js'

// 同步手机号
export const wxSynPhone = (params = {}) => {
  return http.get('Auth/WxSynPhone', params)
}

// 获取微信手机号
export const getWxSynPhone = (params = {}) => {
  return http.get('Auth/getWxSynPhone', params)
}
