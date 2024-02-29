import { paramsQuery } from '@/utils/common'
import { useCheckQrcode } from '@/hooks/useCheckQrcode'
// 扫码签到逻辑
export const useScanCode = () => {
  return new Promise((resolve) => {
    uni.scanCode({
      onlyFromCamera: true,
      // scanType: ['qrCode'], //2023-05-25加此参数，ios无法扫小程序码
      success: async (res) => {
        if (res.errMsg !== 'scanCode:ok') {
          return uni.showToast({ icon: 'none', title: '扫码失败' })
        }
        if (res.scanType !== 'WX_CODE') {
          return uni.showToast({ icon: 'none', title: '请扫小程序码' })
        }
        let { path } = res
        if (!path) {
          return uni.showToast({ icon: 'none', title: '小程序码错误' })
        }
        const { scene } = paramsQuery(path).params
        if (!scene) {
          return uni.showToast({ icon: 'none', title: '小程序码错误' })
        }
        let err = null
        ;[err, res] = await useCheckQrcode(2, scene)
        if (!err) {
          return resolve([null, res])
        }
        return resolve([err, null])
      },
      fail: (err) => resolve([err, null])
    })
  })
}
