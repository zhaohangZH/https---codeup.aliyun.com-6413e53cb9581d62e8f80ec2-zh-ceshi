import http from './broker.js'

// 藏品列表
export const getGoodsCollectionList = (params = {}) => {
  return http.post('GoodsCollection/GetGoodsCollectionList', params)
}

// 藏品抽屉列表
export const getGoodsCollectionListDetail = (params = {}) => {
  return http.post('GoodsCollection/GetGoodsCollectionListDetail', params)
}

// 藏品详情
export const getGoodsCollectionInfo = (params = {}) => {
  return http.get('GoodsCollection/GetGoodsCollectionInfo', params)
}

// 获取商品筛选条件
export const getGoodsCondition = (params = {}) => {
  return http.get('GoodsCollection/GetGoodsCondition', params)
}
