import http from './broker.js'

//文创列表
export const getGoodsCulturalList = (params = {}) => {
  return http.post('Goods/getGoodsCulturalList', params)
}

//新文创列表
export const getGoodsCulturalAllList = (params = {}) => {
  return http.post('Goods/getGoodsCulturalAllList', params)
}

//某文创加载更多
export const getGoodsCulturalDetailedList = (params = {}) => {
  return http.post('Goods/getGoodsCulturalDetailedList', params)
}

// 文创详情
export const getGoodsCulturalInfo = (params = {}) => {
  return http.get('Goods/getGoodsCulturalInfo', params)
}
