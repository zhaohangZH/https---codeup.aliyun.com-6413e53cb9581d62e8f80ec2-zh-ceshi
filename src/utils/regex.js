/**
 * 验证电子邮箱格式
 */
export const isEmail = (value) => {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)
}

/**
 * 验证手机格式
 */
export const isMobile = (value) => {
  return /^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/.test(value)
}

/**
 * 验证URL格式
 */
export const isUrl = (value) => {
  return /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(
    value
  )
}

/**
 * 验证日期格式
 */
export const isDate = (value) => {
  if (!value) return false
  // 判断是否数值或者字符串数值(意味着为时间戳)，转为数值，否则new Date无法识别字符串时间戳
  if (number(value)) value = +value
  return !/Invalid|NaN/.test(new Date(value).toString())
}

/**
 * 验证ISO类型的日期格式
 */
export const isDateISO = (value) => {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
}

/**
 * 验证十进制数字
 */
export const isNumber = (value) => {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value)
}

/**
 * 验证字符串
 */
export const isString = (value) => {
  return typeof value === 'string'
}

/**
 * 验证整数
 */
export const isDigits = (value) => {
  return /^\d+$/.test(value)
}

/**
 * 验证身份证号码
 */
export const isIdCard = (value) => {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test(value)
}

/**
 * 金额,只允许2位小数
 */
export const isAmount = (value) => {
  // 金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value)
}

/**
 * 中文
 */
export const isChinese = (value) => {
  const reg = /^[\u4e00-\u9fa5]+$/gi
  return reg.test(value)
}

/**
 * 只能输入字母
 */
export const isLetter = (value) => {
  return /^[a-zA-Z]*$/.test(value)
}

/**
 * 只能是字母或者数字
 */
export const isEnOrNum = (value) => {
  // 英文或者数字
  const reg = /^[0-9a-zA-Z]*$/g
  return reg.test(value)
}

/**
 * 验证是否包含某个值
 */
export const isContains = (value, param) => {
  return value.indexOf(param) >= 0
}

/**
 * 验证一个值范围[min, max]
 */
export const isRange = (value, param) => {
  return value >= param[0] && value <= param[1]
}

/**
 * 验证一个长度范围[min, max]
 */
export const isRangeLength = (value, param) => {
  return value.length >= param[0] && value.length <= param[1]
}

/**
 * 判断是否为空
 */
export const isEmpty = (value) => {
  switch (typeof value) {
    case 'undefined':
      return true
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
      break
    case 'boolean':
      if (!value) return true
      break
    case 'number':
      if (value === 0 || isNaN(value)) return true
      break
    case 'object':
      if (value === null || value.length === 0) return true
      for (const i in value) {
        return false
      }
      return true
  }
  return false
}

/**
 * 是否json字符串
 */
export const isJsonString = (value) => {
  if (typeof value === 'string') {
    try {
      const obj = JSON.parse(value)
      if (typeof obj === 'object' && obj) {
        return true
      }
      return false
    } catch (e) {
      return false
    }
  }
  return false
}

/**
 * 是否数组
 */
export const isArray = (value) => {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  }
  return Object.prototype.toString.call(value) === '[object Array]'
}

/**
 * 是否对象
 */
export const isObject = (value) => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 是否短信验证码
 */
export const isCode = (value, len = 6) => {
  return new RegExp(`^\\d{${len}}$`).test(value)
}

/**
 * 是否函数方法
 * @param {Object} value
 */
export const isFunc = (value) => {
  return typeof value === 'function'
}

/**
 * 是否promise对象
 * @param {Object} value
 */
export const isPromise = (value) => {
  return object(value) && func(value.then) && func(value.catch)
}

/** 是否图片格式
 * @param {Object} value
 */
export const isImage = (value) => {
  const newValue = value.split('?')[0]
  const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i
  return IMAGE_REGEXP.test(newValue)
}

/**
 * 是否视频格式
 * @param {Object} value
 */
export const isVideo = (value) => {
  const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i
  return VIDEO_REGEXP.test(value)
}

/**
 * 是否GLB文件格式
 * @param {Object} value
 */
export const isGlb = (value) => {
  const VIDEO_REGEXP = /\.(glb)/i
  return VIDEO_REGEXP.test(value)
}

/**
 * 是否PAG文件格式
 * @param {Object} value
 */
export const isPag = (value) => {
  const VIDEO_REGEXP = /\.(pag)/i
  return VIDEO_REGEXP.test(value)
}
