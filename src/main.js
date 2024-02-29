import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist-uni'
import './patch.js'
import { getShare, shareRecord } from '@/api/share.js'
import { getCurrentPage } from '@/utils/common.js'

// 扫码签到逻辑
import { useCheckQrcode } from '@/hooks/useCheckQrcode'

import App from './App.vue'
export function createApp() {
  const store = Pinia.createPinia().use(piniaPluginPersist)
  const app = createSSRApp(App).use(store)

  app.mixin({
    onLoad(query) {
      ;(async () => {
        const { redirect, reLaunch, shareCode, scene } = query

        let p = []
        let keyList = Object.keys(query)
        for (let i = 0, l = keyList.length; i < l; i++) {
          const k = keyList[i]
          if (k === 'reLaunch' || query[k] === undefined) continue
          p.push(`${k}=${query[k]}`)
        }

        if (reLaunch) {
          return setTimeout(() => {
            uni.reLaunch({ url: `${reLaunch + (p.length ? '?' + p.join('&') : '')}` })
          }, 100)
        }

        // 扫码跳转逻辑
        if (scene) return await useCheckQrcode(1, scene)

        /**
         * 下方逻辑待修改
         */
        p = []
        keyList = Object.keys(query)
        for (let i = 0, l = keyList.length; i < l; i++) {
          const k = keyList[i]
          if (k === 'redirect' || k === 'shareCode' || k === 'reLaunch' || query[k] === undefined) {
            continue
          }
          p.push(`${k}=${query[k]}`)
        }

        if (shareCode) {
          await shareRecord(query)
        }
        if (redirect) {
          setTimeout(() => {
            uni.navigateTo({ url: `${redirect}?${p.join('&')}` })
          }, 900)
        }
      })()

      uni.hideShareMenu()
      this.mixin$_shareInfo = {
        shareAppMessage: null,
        shareTimeline: null
      }
      setTimeout(async () => {
        const { $page } = getCurrentPage()
        const [err, res] = await getShare({ path: $page.fullPath })
        if (!err) {
          const menus = []
          const { result } = res
          if (result.shareAppMessage) {
            menus.push('shareAppMessage')
          }
          if (result.shareTimeline) {
            menus.push('shareTimeline')
          }
          if (menus.length) {
            this.mixin$_shareInfo = result
            uni.showShareMenu({ menus })
          }
        }
      }, 60)
    },
    onShareAppMessage() {
      return this.mixin$_shareInfo.shareAppMessage || {}
    },
    onShareTimeline() {
      return this.mixin$_shareInfo.shareTimeline || {}
    }
  })

  return {
    app,
    Pinia
  }
}
