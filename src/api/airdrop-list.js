import http from './broker.js'

// 空投列表
export const getProjectCollectionList = (params = {}) => {
  return http.post('Project/getProjectCollectionList', params)
}
