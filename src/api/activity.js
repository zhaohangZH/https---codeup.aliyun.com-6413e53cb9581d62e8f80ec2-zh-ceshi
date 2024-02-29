import http from './broker.js'

// 活动列表
export const getActivityList = (params = {}) => {
  return http.post('Activity/GetActivityList', params)
}

// 活动信息
export const getActivityInfo = (params = {}) => {
  return http.get('Activity/GetActivityInfo', params)
}

// 获取报名收费清单
export const getActivityCharge = (params = {}) => {
  return http.get('Activity/GetActivityCharge', params)
}

// 获取报名收费清单
export const activitySignUp = (params = {}) => {
  return http.get('Activity/SignUp', params)
}

// 获取报名结果
export const getSignUpResult = (params = {}) => {
  return http.get('Activity/GetSignUpResult', params)
}

// 活动校区
export const getSchool = (params = {}) => {
  return http.get('Activity/getSchool', params)
}

// 新活动校区
export const getSignSchool = (params = {}) => {
  return http.get('Activity/getSignSchool', params)
}

// 填写报名信息
export const signUpInfo = (params = {}) => {
  return http.post('Activity/signUpInfo', params)
}

// 用户参与的活动
export const getUserActivityList = (params = {}) => {
  return http.post('Activity/getUserActivityList', params)
}

// 用户可参与活动分组
export const getActivityChargeGrop = (params = {}) => {
  return http.get('Activity/getActivityChargeGrop', params)
}

// 用户可参与活动分组详情
export const getActivityChargeGropDetail = (params = {}) => {
  return http.get('Activity/getActivityChargeGropDetail', params)
}

// 获取公布结果
export const getActivityResultList = (params = {}) => {
  return http.post('Activity/getActivityResultList', params)
}

// 获取是否签到
export const getIsSignIn = (params = {}) => {
  return http.get('Activity/getIsSignIn', params)
}
