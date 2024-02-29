import { isNumber, isArray, isEmpty } from './regex.js'

// 去除空格
export const trim = (str, pos = 'both') => {
  str = String(str)
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, '')
  }
  if (pos == 'left') {
    return str.replace(/^\s*/, '')
  }
  if (pos == 'right') {
    return str.replace(/(\s*$)/g, '')
  }
  if (pos == 'all') {
    return str.replace(/\s+/g, '')
  }
  return str
}

// 添加尺寸单位
export const addUnit = (value = 'auto', unit = 'rpx') => {
  value = String(value)
  return isNumber(value) ? `${value}${unit}` : value
}

// 获取px值
export const getPx = (value, unit = false) => {
  if (isNumber(value)) {
    return unit ? `${value}px` : Number(value)
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(value)) {
    return unit ? `${uni.upx2px(parseInt(value))}px` : Number(uni.upx2px(parseInt(value)))
  }
  return unit ? `${parseInt(value)}px` : parseInt(value)
}

// 样式转换
export const addStyle = (customStyle, target = 'object') => {
  // 字符串转字符串，对象转对象情形，直接返回
  if (
    isEmpty(customStyle) ||
    (typeof customStyle === 'object' && target === 'object') ||
    (typeof customStyle === 'string' && target === 'string')
  ) {
    return customStyle
  }
  // 字符串转对象
  if (target === 'object') {
    // 去除字符串样式中的两端空格(中间的空格不能去掉，比如padding: 20px 0如果去掉了就错了)，空格是无用的
    customStyle = trim(customStyle)
    // 根据";"将字符串转为数组形式
    const styleArray = customStyle.split(';')
    const style = {}
    // 历遍数组，拼接成对象
    for (let i = 0; i < styleArray.length; i++) {
      // 'font-size:20px;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
      if (styleArray[i]) {
        const item = styleArray[i].split(':')
        style[trim(item[0])] = trim(item[1])
      }
    }
    return style
  }
  // 这里为对象转字符串形式
  let string = ''
  for (const i in customStyle) {
    // 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
    const key = i.replace(/([A-Z])/g, '-$1').toLowerCase()
    string += `${key}:${customStyle[i]};`
  }
  // 去除两端空格
  return trim(string)
}

// 深度克隆
export const deepClone = (obj) => {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    // 原始类型直接返回
    return obj
  }
  const o = isArray(obj) ? [] : {}
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  }
  return o
}

// 对象深度合并
export const deepMerge = (target = {}, source = {}) => {
  target = deepClone(target)
  if (typeof target !== 'object' || typeof source !== 'object') return false
  for (const prop in source) {
    if (!source.hasOwnProperty(prop)) continue
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop]
      } else if (typeof source[prop] !== 'object') {
        target[prop] = source[prop]
      } else if (target[prop].concat && source[prop].concat) {
        target[prop] = target[prop].concat(source[prop])
      } else {
        target[prop] = deepMerge(target[prop], source[prop])
      }
    } else {
      target[prop] = source[prop]
    }
  }
  return target
}

// guid
export const guid = (len = 32, firstC = true, radix = null) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  radix = radix || chars.length

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    let r
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  // 第一个字符为数值时,该guuid不能用作id或者class,替换第一位为c
  if (firstC) {
    return `c${uuid.join('')}`
  }
  return uuid.join('')
}

// 对象转url参数
export const queryParams = (data = {}, isPrefix = true, arrayFormat = 'brackets') => {
  const prefix = isPrefix ? '?' : ''
  const _result = []
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1)
    arrayFormat = 'brackets'
  for (const key in data) {
    const value = data[key]
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      continue
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (let i = 0; i < value.length; i++) {
            _result.push(`${key}[${i}]=${value[i]}`)
          }
          break
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`)
          })
          break
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach((_value) => {
            _result.push(`${key}=${_value}`)
          })
          break
        case 'comma':
          // 结果: ids=1,2,3
          let commaStr = ''
          value.forEach((_value) => {
            commaStr += (commaStr ? ',' : '') + _value
          })
          _result.push(`${key}=${commaStr}`)
          break
        default:
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`)
          })
      }
    } else {
      _result.push(`${key}=${value}`)
    }
  }
  return _result.length ? prefix + _result.join('&') : ''
}

// url参数转对象
export const paramsQuery = (url) => {
  if (!url) {
    throw 'url格式化失败'
  }
  const urlParams = url.split('?')
  let obj = {}
  // 如果没有传参，返回一个空对象
  if (urlParams[1]) {
    // 将参数分成数组
    let arr = urlParams[1].split('#')[0].split('&')
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      if (!item) continue
      // 分离成key:value的形式
      let a = item.split('=')
      // 将undefined标记为true
      let paramName = a[0]
      let paramValue = typeof a[1] === 'undefined' ? '' : a[1]
      // 如果paramName以方括号结束, e.g. colors[] or colors[2]
      if (!paramName) continue
      if (paramName.match(/[(\d+)?]$/)) {
        // 如果paramName不存在，则创建key
        let key = paramName.replace(/[(\d+)?]/, '')
        if (!obj[key]) obj[key] = []
        // 如果是索引数组 e.g. colors[2]
        if (paramName.match(/[\d+]$/)) {
          // 获取索引值并在对应的位置添加值
          let index = /[(\d+)]/.exec(paramName)[1]
          obj[key][index] = paramValue
        } else {
          // 如果是其它的类型，也放到数组中
          obj[key].push(paramValue)
        }
      } else {
        // 处理字符串类型
        if (!obj[paramName]) {
          // 如果如果paramName不存在，则创建对象的属性
          obj[paramName] = paramValue
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          // 如果属性存在，并且是个字符串，那么就转换为数组
          obj[paramName] = [obj[paramName]]
          obj[paramName].push(paramValue)
        } else {
          // 如果是其它的类型，还是往数组里丢
          obj[paramName].push(paramValue)
        }
      }
    }
  }
  return {
    path: urlParams[0],
    params: obj
  }
}

// 数字格式化
export const priceFormat = (number, decimals = 0, decimalPoint = '.', thousandsSeparator = ',') => {
  number = `${number}`.replace(/[^0-9+-Ee.]/g, '')
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = typeof thousandsSeparator === 'undefined' ? ',' : thousandsSeparator
  const dec = typeof decimalPoint === 'undefined' ? '.' : decimalPoint
  let s = ''

  s = (prec ? round(n, prec) + '' : `${Math.round(n)}`).split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, `$1${sep}$2`)
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

// 获取当前页面路径
export const getCurrentPagePath = () => {
  const pages = getCurrentPages()
  return `/${pages[pages.length - 1]?.route ?? ''}`
}

// 获取当前页面路径
export const getCurrentPage = () => {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

//获取当前路由栈实例数组
export const getPageList = () => {
  const pages = getCurrentPages()
  return pages
}

// 当前什么时间
export const getTimeState = () => {
  // 获取当前时间
  let timeNow = new Date()
  // 获取当前小时
  let hours = timeNow.getHours()
  // 设置默认文字
  let text = ``
  // 判断当前时间段
  if (hours >= 0 && hours <= 10) {
    text = `早上好`
  } else if (hours > 10 && hours <= 14) {
    text = `中午好`
  } else if (hours > 14 && hours <= 18) {
    text = `下午好`
  } else if (hours > 18 && hours <= 24) {
    text = `晚上好`
  }
  // 返回当前时间段对应的状态
  return text
}
