import http from './broker.js'

//比赛详情
export const getSpecialColumnInfo = (params = {}) => {
  return http.get('SpecialColumn/getSpecialColumnInfo', params)
}

// 活动分组活动
export const getGameGroupList = (params = {}) => {
  return http.post('SpecialColumn/getGameGroupList', params)
}
// 活动分组活动
export const getActivityGroupList = (params = {}) => {
  return http.post('SpecialColumn/getActivityGroupList', params)
}

// 图片列表
export const getGameGroupFilesList = (params = {}) => {
  return http.post('SpecialColumn/getGameGroupFilesList', params)
}

// 活动日期更多图片
export const getSpecialColumnMoreList = (params = {}) => {
  return http.post('SpecialColumn/getSpecialColumnMoreList', params)
}
