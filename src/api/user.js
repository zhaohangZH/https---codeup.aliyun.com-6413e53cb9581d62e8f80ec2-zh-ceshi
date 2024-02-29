import http from './broker.js'

// 获取用户信息
export const GetUser = (params = {}) => {
  return http.get('User/GetUser', params)
}

// 修改个人信息
export const modifyUser = (params = {}) => {
  return http.post('User/ModifyUser', params)
}

// 提交实名认证
export const realNameCertification = (params = {}) => {
  return http.post('User/RealNameCertification', params)
}

// 收货地址列表
export const getUserAddressList = (params = {}) => {
  return http.post('User/GetUserAddressList', params)
}

// 添加地址
export const addUserAddress = (params = {}) => {
  return http.post('User/AddUserAddress', params)
}

// 我的账单
export const getDonationInformationList = (params = {}) => {
  return http.post('User/getDonationInformationList', params)
}

// 删除地址
export const deleteUserAddress = (params = {}) => {
  return http.post('User/DeleteUserAddress', params)
}

// 获取证书藏品数量
export const getUserStatisticsCount = (params = {}) => {
  return http.get('User/getUserStatisticsCount', params)
}

// 我的成就
export const getUserAchievementList = (params = {}) => {
  return http.post('User/getUserAchievementList', params)
}

// 意见反馈
export const submitUserFeedback = (params = {}) => {
  return http.post('User/submitUserFeedback', params)
}

// 帮助中心
export const getHelpCenterList = (params = {}) => {
  return http.post('User/getHelpCenterList', params)
}

// 隐私政策
export const getPrivacyPolicyList = (params = {}) => {
  return http.post('User/GetPrivacyPolicyList', params)
}

// 关于我们
export const getAboutUs = (params = {}) => {
  return http.get('User/getAboutUs', params)
}

// 我的证书
export const getUserCertificateList = (params = {}) => {
  return http.post('User/getUserCertificateList', params)
}

// 我的证书详情
export const getUserCertificateDetails = (params = {}) => {
  return http.get('User/getUserCertificateDetails', params)
}

// 成就详情
export const getUserAchievementDetails = (params = {}) => {
  return http.get('User/getUserAchievementDetails', params)
}
