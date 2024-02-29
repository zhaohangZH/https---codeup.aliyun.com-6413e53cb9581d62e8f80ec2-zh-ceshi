import { checkQrcode } from '@/api/share'
import { paramsQuery } from '@/utils/common'
import getTabList from '@/business/bc-tabbar/tabbar-list'
import { gotoWebview } from '@/utils/webview.js'
export const useCheckQrcode = async (channelType, _hash_code) => {
  if (!channelType || !_hash_code) return Promise.resolve([Error('必填参数不能为空'), null])

  const [err, res] = await checkQrcode({ channelType, _hash_code })
  if (!err) {
    const result = (res.result || {}).path || ''
    let url = decodeURIComponent(result)
    const { path, params } = paramsQuery(url)
    let tabBar = false
    if (path) {
      // 遍历判断 是否为tabbar页面
      const tabList = getTabList()
      for (let i = 0, l = tabList.length; i < l; i++) {
        const item = tabList[i]
        if (path.indexOf(item.pagePath) > -1) {
          tabBar = true
          break
        }
      }
      setTimeout(() => {
        // tabbar页面跳转（switchTab）无法携带参数，所以使用（reLaunch）方式跳转。
        // // uni[tabBar ? 'reLaunch' : 'navigateTo']({ url })
        if (tabBar) {
          uni['reLaunch']({ url })
        } else if (path.indexOf('pages/webview/index') > -1) {
          // webview页面还需要单独处理
          const httpLink = url.split('?url=')[1]
          httpLink && gotoWebview(httpLink)
        } else {
          uni['navigateTo']({ url })
        }
      }, 900)
    }
    return Promise.resolve([null, { tabBar, fullPath: url, path, params }])
  }
  return Promise.resolve([err, null])
}
