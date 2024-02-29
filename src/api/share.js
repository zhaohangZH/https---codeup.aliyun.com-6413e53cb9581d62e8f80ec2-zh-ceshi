import http from './broker.js'

// 获取当前页面分享信息
export const getShare = (params = {}) => {
  return http.get('sys/getShare', params)
}

// 上传分享数据
export const shareRecord = (params = {}) => {
  return http.post('sys/shareRecord', params)
}

// 扫码总入口
export const checkQrcode = (params = {}) => {
  return http.get('sys/checkQrcode', params)
}
