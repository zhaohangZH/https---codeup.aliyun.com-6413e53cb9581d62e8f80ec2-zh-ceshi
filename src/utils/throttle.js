// 文档参考 lodash -- throttle

import { debounce } from './debounce.js'
import { isObject } from './regex.js'

// function throttle
export const throttle = (func, wait, options) => {
  let leading = true
  let trailing = false

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait
  })
}
