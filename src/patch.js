import router from '@/router'

uni.$have = {
  // 重写toast/loading相关api
  showToast: uni.showToast,
  hideToast: uni.hideToast,
  showLoading: uni.showLoading,
  hideLoading: uni.hideLoading,

  // 重写路由相关api
  navigateTo: uni.navigateTo,
  redirectTo: uni.redirectTo,
  reLaunch: uni.reLaunch,
  switchTab: uni.switchTab,
  navigateBack: uni.navigateBack
}

class CustomToast {
  constructor() {
    // 初始化loading
    this._loadingReset()
  }
  _loadingReset() {
    // 记录loading
    this.loadingNote = {
      // loading开启记录
      openTimer: null,
      openTimestamp: 0,
      // loading关闭记录
      closeTimer: null,
      closeTimestamp: 0,
      // loading调用计数器
      count: 0
    }
  }

  showToast(ags) {
    return new Promise((resolve) => {
      let obj = {}
      const agsType = Object.prototype.toString.apply(ags)
      if (agsType === '[object Object]') {
        obj = ags
      } else if (agsType === '[object String]') {
        obj = { title: ags, icon: 'none' }
      } else {
        obj = { title: '提示信息', icon: 'none' }
      }
      uni.$have.showToast({ ...obj, success: resolve(true), fail: resolve(false) })
    })
  }
  hideToast() {
    return new Promise((resolve) => {
      uni.$have.hideToast({ noConflict: true, success: resolve(true), fail: resolve(false) })
    })
  }

  showLoading(ags) {
    this.loadingNote.count += 1
    if (this.loadingNote.count > 1) return Promise.resolve(false)
    if (this.loadingNote.closeTimer) {
      clearTimeout(this.loadingNote.closeTimer)
      this.loadingNote.closeTimestamp = 0
      this.loadingNote.closeTimer = null
      return Promise.resolve(false)
    }
    return new Promise((resolve) => {
      let obj = {}
      const agsType = Object.prototype.toString.apply(ags)
      if (agsType === '[object Object]') {
        obj = ags
      } else if (agsType === '[object String]') {
        obj = { title: ags }
      } else {
        obj = { title: '拼命加载中' }
      }
      this.loadingNote.openTimestamp = new Date().getTime()
      this.loadingNote.openTimer = setTimeout(() => {
        uni.$have.showLoading({
          mask: true,
          ...obj,
          success: resolve(true),
          fail: resolve(false)
        })
      }, 800)
    })
  }
  hideLoading() {
    this.loadingNote.count -= 1
    if (this.loadingNote.count > 0) return Promise.resolve(false)
    return new Promise((resolve) => {
      let timeDiff = new Date().getTime() - this.loadingNote.openTimestamp
      timeDiff = timeDiff < 800 || timeDiff > 1600 ? 0 : 1600 - timeDiff
      if (!timeDiff) {
        // 800ms内关闭loading则不显示
        clearTimeout(this.loadingNote.openTimer)
        uni.$have.hideLoading({
          noConflict: true,
          complete: ({ errMsg }) => {
            // 重置loading记录
            resolve(errMsg === 'hideLoading:ok')
          }
        })
        this._loadingReset()
      } else {
        // 超过800ms时，则
        this.loadingNote.closeTimestamp = new Date().getTime()
        this.loadingNote.closeTimer = setTimeout(() => {
          uni.$have.hideLoading({
            noConflict: true,
            complete: ({ errMsg }) => {
              // 重置loading记录
              this._loadingReset()
              resolve(errMsg === 'hideLoading:ok')
            }
          })
        }, timeDiff)
      }
    })
  }
}
const ctmToast = new CustomToast()

// toast轻提示
uni.showToast = (ags) => ctmToast.showToast(ags)
uni.hideToast = () => ctmToast.hideToast()
// loading框
uni.showLoading = (ags) => ctmToast.showLoading(ags)
uni.hideLoading = () => ctmToast.hideLoading()
// 路由跳转相关
uni.navigateTo = (ags) => router({ ...ags, type: 'to' })
uni.redirectTo = (ags) => router({ ...ags, type: 'redirect' })
uni.reLaunch = (ags) => router({ ...ags, type: 'reLaunch' })
uni.switchTab = (ags) => router({ ...ags, type: 'tab' })
uni.navigateBack = (ags) => router({ ...ags, type: 'back' })
