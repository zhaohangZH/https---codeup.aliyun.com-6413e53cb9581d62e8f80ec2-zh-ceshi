import Router from './route'
// import { getCurrentPagePath } from '@/utils/common'

// let jumping = false
// const LOGIN_PATH = '/pages/login/index'
const router = new Router()

router.beforeEach = (config, resolve) => {
  // // 跳转中，禁止再次跳转
  // if (jumping) return resolve(false)
  // // 跳转中
  // jumping = true
  // // 去登录页，单独判断
  // if (config.path === LOGIN_PATH) {
  //   jumping = LOGIN_PATH !== getCurrentPagePath()
  // }
  // // 执行resolve(true)或者resolve(false)来决定是否进行路由跳转
  resolve(true)
}

// router.afterEach = () => (jumping = false)

export default router.route
