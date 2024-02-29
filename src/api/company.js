import http from './broker.js'

// 筹款项目
export const getCompanyGroupList = (params = {}) => {
  return http.post('Company/getCompanyGroupList', params)
}

// 筹款项目二级分页
export const getCompanyList = (params = {}) => {
  return http.post('Company/getCompanyList', params)
}

// 筹款项目详情
export const getCompanyDetail = (params = {}) => {
  return http.get('Company/getCompanyDetail', params)
}
