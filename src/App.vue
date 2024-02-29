<script>
// #ifdef MP-WEIXIN
import { WxLogin } from '@/api/index'
import { useAuthStore } from '@/store/auth'
import { useUserStore } from '@/store/user'
// #endif
export default {
  onLaunch({ scene }) {
    // const staticURL = import.meta.env.VITE_VUE_APP_STATIC_BASEURL
    // Promise.all([
    // uni.loadFontFace({
    //   global: true,
    //   family: 'TsangerYuMo-2',
    //   source: `url("${staticURL}TsangerYuMo-2.ttf")`
    // })
    // uni.loadFontFace({
    //   global: true,
    //   family: 'TsangerYuMo-3',
    //   source: `url("${staticURL}TsangerYuMo-3.ttf")`
    // })
    // ])
    // .then((res) => uni.$emit('font-loaded', true))
    // .catch((err) => uni.$emit('font-loaded', false))

    // #ifdef MP-WEIXIN
    ;(async () => {
      if (scene === 1154) {
        // 分享朋友圈后的单页面
        useAuthStore().setToken({ access_token: 'xxxxxxxx' })
      } else {
        const updateManager = uni.getUpdateManager()
        updateManager.onUpdateReady(() => {
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success(res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
        const code = await new Promise((resolve) => {
          uni.login({
            provider: 'weixin',
            success({ code }) {
              resolve(code)
            }
          })
        })
        const [err, res] = await WxLogin({ code })
        if (!err) {
          const { result } = res
          useAuthStore().setToken({
            refresh_token: result.refreshToken,
            access_token: result.accessToken
          })
          useUserStore().setUserInfo(result)
        }
      }
    })()
    // #endif
  }
}
</script>

<style lang="scss">
@import './utils/index.css';
page {
  background-color: #f6f6f6;
  font-family: TsangerYuMo-2;

  ::-webkit-scrollbar {
    width: 0px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: rgba(0, 0, 0, 0);
  }
}
// #ifdef H5
.uni-tabbar-bottom {
  display: none;
}
// #endif
.hover-class {
  opacity: 0.75;
}
/*每个页面公共css */
@for $i from 1 through 5 {
  .tc-line-#{$i} {
    /* #ifdef APP-NVUE */
    // nvue下，可以直接使用lines属性，这是weex特有样式
    lines: $i;
    text-overflow: ellipsis;
    overflow: hidden;
    flex: 1;
    /* #endif */

    /* #ifndef APP-NVUE */
    // vue下，单行和多行显示省略号需要单独处理
    @if $i == '1' {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    } @else {
      display: -webkit-box !important;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-line-clamp: $i;
      -webkit-box-orient: vertical !important;
    }
    /* #endif */
  }
}
</style>
