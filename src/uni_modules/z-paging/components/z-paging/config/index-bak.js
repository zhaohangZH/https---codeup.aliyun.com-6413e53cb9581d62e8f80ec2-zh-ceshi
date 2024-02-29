// z-paging全局配置文件，注意避免更新时此文件被覆盖，若被覆盖，可在此文件中右键->点击本地历史记录，找回覆盖前的配置
const loadingImg = `${import.meta.env.VITE_VUE_APP_STATIC_BASEURL}loading.gif`
export default {
  // 下拉刷新自定义配置
  'refresher-threshold': '110rpx',
  'refresher-default-text': '',
  'refresher-pulling-text': '',
  'refresher-refreshing-text': '',
  'refresher-complete-text': '',
  'refresher-default-img': loadingImg,
  'refresher-pulling-img': loadingImg,
  'refresher-refreshing-img': loadingImg,
  'refresher-complete-img': loadingImg,
  'refresher-refreshing-animated': false,
  'refresher-img-style': {
    'margin-right': 0,
    width: '42rpx',
    height: '42rpx',
    transform: 'rotate(0deg)',
    color: 'rgba(0,0,0,0)',
    'background-color': 'rgba(0,0,0,0)'
  },

  // 上拉加载更多自定义配置
  'lower-threshold': '110rpx',
  'loading-more-loading-text': '正在努力加载中...',
  'loading-more-loading-icon-type': '',
  'loading-more-loading-icon-custom-image': loadingImg,
  'show-loading-more-no-more-line': false,
  'loading-more-custom-style': {
    height: '110rpx'
  },
  'loading-more-title-custom-style': {
    'font-size': '24rpx',
    color: '#aaa'
  },
  'loading-more-loading-icon-custom-style': {
    'margin-right': '12rpx',
    width: '42rpx',
    height: '42rpx',
    color: 'rgba(0,0,0,0)',
    'background-color': 'rgba(0,0,0,0)',
    animation: 'none'
  },
  'hide-no-more-inside': true
}
