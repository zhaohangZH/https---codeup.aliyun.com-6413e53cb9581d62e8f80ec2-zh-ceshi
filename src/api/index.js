import http from './broker.js'

export const WxLogin = (params = {}) => {
  return http.get('Auth/WxLogin', params, { custom: { entry: true } })
}

export const GetUserAddress = (params = {}) => {
  return http.get('User/GetUserAddress', params)
}

export const getBannerList = (params = {}) => {
  return http.get('Home/getBannerList', params)
}

export const getTopProjectList = (params = {}) => {
  return http.get('Home/getTopProjectList', params)
}

export const projectinfo = (params = {}) => {
  return http.get('ProjectInfo/projectinfo', params)
}

export const getProjectPay = (params = {}) => {
  return http.get('ProjectInfo/getProjectPay', params)
}

// 详情页捐款列表
export const getProjectPayList = (params = {}) => {
  return http.post('ProjectInfo/getProjectPayList', params)
}

// 详情页留言列表
export const getProjectCommentList = (params = {}) => {
  return http.post('ProjectInfo/getProjectCommentList', params)
}

export const GetProjectGiveGoods = (params = {}) => {
  return http.get('ProjectInfo/GetProjectGiveGoods', params)
}

// 捐款前提交表单
export const addCollectData = (params = {}) => {
  return http.post('ProjectInfo/addCollectData', params)
}

export const createOrder = (params = {}) => {
  return http.post('BocPay/createOrder', params)
}

export const GetModifyPayOrderDetail = (params = {}) => {
  return http.get('Pay/GetModifyPayOrderDetail', params)
}

export const ModifyPayOrder = (params = {}) => {
  return http.post('Pay/ModifyPayOrder', params)
}

export const checkOrder = (params = {}) => {
  return http.get('BocPay/checkOrder', params)
}

export const goToMiniProgram = (params = {}) => {
  return http.get('BocPay/navigateToMiniProgram', params)
}

export const uploadFile = (params = {}, ops) => {
  return http.upload('UploadFile/UploadFile', params, ops)
}

export const uploadFileDic = (params = {}, ops) => {
  return http.upload('UploadFile/UploadFileDic', params, ops)
}

export const getCompanyInfo = (params = {}) => {
  return http.get('Project/getCompanyInfo', params)
}

export const getSmallProjectList = (params = {}) => {
  return http.post('Project/getSmallProjectList', params)
}

export const getProjectDetail = (params = {}) => {
  return http.get('ProjectInfo/getProjectDetail', params)
}

export const getBannerFiles = (params = {}) => {
  return http.get('BannerFiles/GetBannerFiles', params)
}
