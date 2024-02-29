export const gotoWebview = (linkUrl) => {
  uni.navigateTo({ url: 'pages/webview/index?url=' + encodeURIComponent(linkUrl) })
}
