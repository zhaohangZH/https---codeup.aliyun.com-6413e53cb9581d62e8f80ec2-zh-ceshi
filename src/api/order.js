import http from './broker.js'

// 订单列表
export const getPayOrderList = (params = {}) => {
  return http.post('Pay/GetPayOrderList', params, { custom: { refresh: true } })
}

// 订单详情
export const getPayOrderDetail = (params = {}) => {
  return http.get('Pay/GetPayOrderDetail', params)
}

// 快递100
export const getPayOrderExpress = (params = {}) => {
  return http.get('Pay/getPayOrderExpress', params)
}

// 获取核销列表
export const getPayWriteOffList = (params = {}) => {
  return http.post('Pay/GetPayWriteOffList', params)
}

// 获取核销订单
export const getPayWriteOff = (params = {}) => {
  return http.get('Pay/getPayWriteOff', params)
}
