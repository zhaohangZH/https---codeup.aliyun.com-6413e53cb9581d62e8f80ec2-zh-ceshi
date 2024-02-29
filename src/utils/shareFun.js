export const shareFile = (URL, name) => {
  wx.downloadFile({
    url: URL, // 下载url
    filePath: wx.env.USER_DATA_PATH + '/' + name,
    success(res) {
      // 下载完成后转发
      wx.shareFileMessage({
        filePath: wx.env.USER_DATA_PATH + '/' + name, //res.tempFilePath,
        fileName: name || '附件',
        success() {},
        fail: console.error
      })
    },
    fail: console.error
  })
}

// 文件类型图标
export const fileIconFun = (item) => {
  if (!item) {
    return 'wu'
  }
  if (item.indexOf('doc') > -1) {
    return 'doc'
  }
  if (item.indexOf('ppt') > -1) {
    return 'ppt'
  }
  if (item.indexOf('xlsx') > -1) {
    return 'xlsx'
  }
  if (item.indexOf('pdf') > -1) {
    return 'pdf'
  }
}
