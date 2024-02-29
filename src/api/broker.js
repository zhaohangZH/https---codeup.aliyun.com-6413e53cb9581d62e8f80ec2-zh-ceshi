import to from 'await-to-js'
import http from '@/request/http'

// 免Token接口地址
const authorization = [
  'Auth/WxLogin',
  'Home/getBannerList',
  'Home/getTopProjectList',
  'ProjectInfo/projectinfo',
  'ProjectInfo/getProjectPay',
  'BannerFiles/GetBannerFiles'
]

const sendRequest = (path, method, obj, ops, open) => {
  if (!path) return Promise.reject('request参数没有找到...')

  uni.showLoading('数据加载中')

  if (method === 0) {
    return http.get(path, { params: obj, ...ops, custom: { ...(ops.custom || {}), open } })
  }

  if (method === 1) {
    return http.post(path, obj, { ...ops, custom: { ...(ops.custom || {}), open } })
  }

  if (method === 2) {
    return http.upload(path, { params: obj, ...ops, custom: { ...(ops.custom || {}), open } })
  }

  return Promise.reject('仅支持GET、POST和UPLOAD方法')
}

let appInit = 1
// #ifdef MP-WEIXIN
const { scene } = uni.getLaunchOptionsSync()
// 小程序分享朋友圈后打开单页模式的判断
scene === 1154 ? 1 : 0
// #endif

let appBroker = []
const useless = async (base = {}, obj = {}, ops = {}) => {
  const { path, method } = base

  if (!path) return Promise.reject('request参数缺失...')
  const params = [path, method, obj, ops, authorization.includes(path)]
  const entry = (ops.custom || {}).entry
  let result
  if (appInit > 0) {
    result = sendRequest(...params)
  } else if (!entry) {
    result = new Promise((resolve, reject) => {
      appBroker.push({ base, obj, ops, resolve, reject })
    })
  } else {
    result = new Promise(async (resolve, reject) => {
      const [err, res] = await to(sendRequest(...params))
      if (err) return reject(err)
      resolve(res)
      appInit = 1
      // 等待初始化请求完成（异步执行后续操作）
      setTimeout(async () => {
        for (let i = 0, l = appBroker.length; i < l; i++) {
          const { base, obj, ops, resolve, reject } = appBroker[i]
          const [err, res] = await to(sendRequest(base.path, base.method, obj, ops, true))
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        }
        appBroker = []
      }, 0)
    })
  }

  const [err, res] = await to(result)

  uni.hideLoading().then(async () => {
    if (err) {
      if (err.statusCode === 401) {
        // 401重新登录
      } else {
        uni.showToast((err.data || {}).message || '服务异常')
      }
    }
  })

  return Promise.resolve([err, res])
}

export default {
  get: (path = '', obj = {}, ops = {}) => useless({ path, method: 0 }, obj, ops),
  post: (path = '', obj = {}, ops = {}) => useless({ path, method: 1 }, obj, ops),
  upload: (path = '', obj = {}, ops = {}) => useless({ path, method: 2 }, obj, ops)
}
