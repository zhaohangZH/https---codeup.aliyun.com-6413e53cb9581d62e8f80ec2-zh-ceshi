import Request from 'luch-request'
import getConfig from './config'
// pinia数据管理
import { useUserStore } from '@/store/user'
import { useAuthStore } from '@/store/auth'
import { RefreshToken } from '@/api/refresh'
import to from 'await-to-js'
/**
 * OAuth 2.0
 *  1、登录后，需要返回refresh_token和access_token
 *  2、refresh_token过期，跳转登录页面，重新登录
 *  3、access_token过期，使用refresh_token去刷新access_token
 *  4、刷新access_token后，需要重新请求的接口列表
 */
// access_token是否过期
let accessTokenInvalid = false
// 暂存的请求列表
let stagingRequestsList = []
// 重新发起请求的列表
let retryRequestsList = []
// 401-权限
const ERR_401 = { statusCode: 401 }

// 设置token
const setAuthorization = (open) => {
  return new Promise(async (resolve, reject) => {
    const authStore = useAuthStore()
    const { refresh_token, access_token } = authStore
    if (open || access_token) {
      resolve(access_token)
    } else if (!refresh_token) {
      reject(ERR_401)
    } else {
      stagingRequestsList.push(resolve)
      if (!accessTokenInvalid) {
        accessTokenInvalid = true
        // ajax请求新access_token
        const [err, res] = await RefreshToken()
        if (!err) {
          authStore.setAccessToken((res.result || {}).access_Token)
        }
        // accecc_token刷新完成，释放缓存的请求
        resendRequest(err)
      }
    }
  })
}
// 刷新token
const resendRequest = async (err) => {
  // 解除token刷新中的锁定状态
  accessTokenInvalid = false

  const { access_token } = useAuthStore()
  // 清空request中的缓存，并放行
  for (let i = 0, l = stagingRequestsList.length; i < l; i++) {
    const item = stagingRequestsList[i]
    item(err ? Promise.reject(err) : Promise.resolve(access_token))
  }
  stagingRequestsList = []

  if (err) {
    // response中的缓存数据reject
    for (let i = 0, l = retryRequestsList.length; i < l; i++) {
      retryRequestsList[i].resolve(Promise.reject(err))
    }
  } else {
    // 重新发送response中的缓存数据
    for (let i = 0, l = retryRequestsList.length; i < l; i++) {
      const item = retryRequestsList[i]
      const config = {
        ...item.config,
        header: { ...(item.config.header || {}), authorization: access_token }
      }
      item.resolve(http.middleware(config))
    }
  }
  // 清空response中的缓存数据
  retryRequestsList = []
}

// http主业务请求
const http = new Request(getConfig())

// 请求拦截
http.interceptors.request.use(
  (config) => {
    const { method, custom = {} } = config

    // refresh接口刷新token
    if (custom.refresh) {
      const authStore = useAuthStore()
      const { refresh_token } = authStore
      config.header = { ...config.header, authorization: 'Bearer ' + refresh_token }
      return Promise.resolve(config)
    }

    // GET/POST 请求才会判断缓存机制
    if ((method === 'GET' || method === 'POST') && custom.cache) {
      // 缓存机制未完成，暂不可用
    }
    /**
     *  1、custom.open判断是否开放接口，无需token即可访问。
     *  2、非开放接口需要access_token方可请求。
     * */
    return new Promise(async (resolve, reject) => {
      const [err, res] = await to(setAuthorization(custom.open))
      if (!err) {
        config.header = { ...config.header, authorization: 'Bearer ' + res }
        resolve(config)
      } else {
        reject(err)
      }
    })
  },
  (config) => {
    return Promise.reject(config)
  }
)

// 响应拦截
http.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data)
  },
  (response) => {
    const { statusCode, config = {} } = response
    if (statusCode !== 401) {
      return Promise.reject(response)
    }
    return new Promise(async (resolve, reject) => {
      const authStore = useAuthStore()
      const { refresh_token } = authStore
      const { custom = {} } = config
      if (!!custom.refresh || !refresh_token) {
        authStore.setToken({ refresh_token: '', access_token: '' })
        useUserStore().setUserInfo({})
        reject(ERR_401)
      } else {
        // 刷新token后，重新请求。暂存本次请求
        retryRequestsList.push({ config, resolve })
        if (!accessTokenInvalid) {
          accessTokenInvalid = true
          // 刷新access_token
          const [err, res] = await RefreshToken()
          if (!err) {
            authStore.setAccessToken((res.result || {}).access_Token)
          }
          // accecc_token刷新完成，释放缓存的请求
          resendRequest(err)
        }
      }
    })
  }
)

// http
export default http
