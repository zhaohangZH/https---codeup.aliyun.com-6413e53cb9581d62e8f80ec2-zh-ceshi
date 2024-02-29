import http from './broker.js'

// 初始化
export const getData = (params = {}) => {
  return http.get('Collect/getData', params)
}
// 提交
export const add = (params = {}) => {
  return http.post('Collect/add', params)
}

// 下拉列表
export const getDrp = (params = {}) => {
  return http.get('Collect/getDrp', params)
}
