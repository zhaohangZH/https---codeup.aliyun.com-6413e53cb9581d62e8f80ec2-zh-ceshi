import http from './broker.js'

// 盲盒列表
export const getGoodsCollectionList = (params = {}) => {
  return http.post('BlindBox/GetGoodsCollectionList', params)
}

// 盲盒抽屉列表
export const getGoodsCollectionListDetail = (params = {}) => {
  return http.post('BlindBox/GetGoodsCollectionListDetail', params)
}

// 打开盲盒
export const openBlindBox = (params = {}) => {
  return http.get('BlindBox/OpenBlindBox', params)
}

// 盲盒结果
export const getBlindBoxResultInfo = (params = {}) => {
  return http.get('BlindBox/GetBlindBoxResultInfo', params)
}

// 盲盒筛选
export const getGoodsCondition = (params = {}) => {
  return http.get('BlindBox/GetGoodsCondition', params)
}
