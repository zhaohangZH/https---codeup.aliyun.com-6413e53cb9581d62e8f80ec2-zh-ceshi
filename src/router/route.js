/**
 * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
 * 并且带有路由拦截功能
 */
import { queryParams, paramsQuery, deepMerge, getCurrentPagePath } from '@/utils/common'
class Router {
  constructor() {
    this.beforeEach = null
    this.afterEach = null
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      path: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'slide-in-right', // 窗口动画,只在APP有效
      animationDuration: 300 // 窗口动画持续时间,单位毫秒,只在APP有效
    }
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this)
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  addRootPath(url) {
    return url[0] === '/' ? url : `/${url}`
  }

  // 整合路由参数
  mixinParam(url, params) {
    url = url && this.addRootPath(url)

    // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
    // 如果有url中有get参数，转换后无需带上"?"
    let query = ''
    if (/.*\/.*\?.*=.*/.test(url)) {
      // object对象转为get类型的参数
      query = queryParams(params, false)
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      return (url += query ? `&${query}` : '')
    }
    // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
    query = queryParams(params)
    return (url += query)
  }

  // 对外的方法名称
  async route(options = {}, params = {}) {
    // 合并用户的配置和内部的默认配置
    let mergeConfig = {}

    if (typeof options === 'string') {
      // 如果options为字符串，则为route(url, params)的形式
      mergeConfig.url = this.mixinParam(options, params)
      mergeConfig.type = 'navigateTo'
    } else {
      mergeConfig = deepMerge(this.config, options)
      // 否则正常使用mergeConfig中的url和params进行拼接
      mergeConfig.url = this.mixinParam(options.url, options.params)
    }
    const fomartURL = paramsQuery(mergeConfig.url)
    // params参数也带给拦截器
    mergeConfig.path = fomartURL.path
    mergeConfig.params = deepMerge(fomartURL.params, params)

    // 如果本次跳转的路径和本页面路径一致，执行重定向跳转
    if (
      mergeConfig.path === getCurrentPagePath() &&
      (mergeConfig.type === 'to' || mergeConfig.type === 'navigateTo')
    ) {
      mergeConfig = deepMerge(mergeConfig, { type: 'redirect' })
    }

    // 合并内外部参数
    mergeConfig = deepMerge(this.config, mergeConfig)
    // 判断用户是否定义了拦截器
    if (typeof this.beforeEach === 'function') {
      // 定一个promise，根据用户执行resolve(true)或者resolve(false)来决定是否进行路由跳转
      const isNext = await new Promise((resolve) => this.beforeEach(mergeConfig, resolve))
      // 如果isNext为true，则执行路由跳转
      isNext && this.openPage(mergeConfig)
    } else {
      this.openPage(mergeConfig)
    }
  }

  // 执行路由跳转
  openPage(config) {
    let complete = () => {}
    if (typeof this.afterEach === 'function') {
      complete = this.afterEach
    }
    // 解构参数
    const { url, type, delta, animationType, animationDuration } = config
    if (type == 'navigateTo' || type == 'to') {
      uni.$have.navigateTo({ url, animationType, animationDuration, complete })
    }
    if (type == 'redirectTo' || type == 'redirect') {
      uni.$have.redirectTo({ url, complete })
    }
    if (type == 'switchTab' || type == 'tab') {
      uni.$have.switchTab({ url, complete })
    }
    if (type == 'reLaunch' || type == 'launch') {
      uni.$have.reLaunch({ url, complete })
    }
    if (type == 'navigateBack' || type == 'back') {
      uni.$have.navigateBack({ delta, complete })
    }
  }
}
export default Router
