import http from './broker.js'

//比赛详情
export const getGameInfo = (params = {}) => {
  return http.get('Game/getGameInfo', params)
}

// 比赛报名类型列表
export const getDrp = (params = {}) => {
  return http.get('Game/getDrp', params)
}

// 比赛报名
export const signUp = (params = {}) => {
  return http.get('Game/signUp', params)
}

//比赛报名表单
export const signUpInfo = (params = {}) => {
  return http.post('Game/signUpInfo', params)
}

// 报名成功页
export const getSignUpResult = (params = {}) => {
  return http.get('Game/getSignUpResult', params)
}

// 投票列表
export const getGameSignList = (params = {}) => {
  return http.post('Game/getGameSignList', params)
}

// 点赞
export const addPopularity = (params = {}) => {
  return http.get('Game/addPopularity', params)
}

// 上传文档规格
export const getGameFileModel = (params = {}) => {
  return http.get('Game/getGameFileModel', params)
}

// 上传文件
export const uploadFileDic = (params = {}, ops) => {
  return http.upload('Game/uploadFileDic', params, ops)
}

// 我的比赛
export const getGameUserList = (params = {}) => {
  return http.post('Game/getGameUserList', params)
}

// 上传我的比赛文件
export const uploadUserGameFile = (params = {}) => {
  return http.post('Game/uploadUserGameFile', params)
}
