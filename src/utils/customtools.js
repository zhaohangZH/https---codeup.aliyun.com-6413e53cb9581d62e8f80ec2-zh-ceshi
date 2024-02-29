// 兼容各平台
export const getBarHeight = () => {
  const res = uni.getSystemInfoSync()
  if (res.platform === 'ios') {
    return 44 + res.statusBarHeight
  } else if (res.platform === 'android') {
    return 48 + res.statusBarHeight
  } else {
    return 0
  }
}
