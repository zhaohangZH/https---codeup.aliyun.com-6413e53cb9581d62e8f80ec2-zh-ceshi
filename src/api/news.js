import http from './broker.js'

// 新闻列表
export const getNewsList = (params = {}) => {
  return http.post('News/getNewsList', params, { custom: { refresh: true } })
}

// 新闻详情
export const getNewsDetail = (params = {}) => {
  return http.get('News/getNewsDetail', params)
}

// 关注
export const newsFollow = (params = {}) => {
  return http.get('News/newsFollow', params)
}
