export const getFormatTime = (leftTime, format) => {
  const numFormat = (n, len) => {
    const maxNum = 10 ** len - 1
    if (n >= maxNum) {
      return n
    } else {
      const carryLen = len - n.toString().length
      let str = ''
      for (let i = 0; i < carryLen; i++) {
        str += '0'
      }
      return str + n
    }
  }

  const getTimeSplit = (format) => {
    const fomatMap = new Set(['Y', 'M', 'D', 'H', 'm', 's', 'S'])
    const m = []
    for (let i = 0; i < format.length; i++) {
      const k = format[i]
      if (m.length === 0 || m[m.length - 1].k !== k || !fomatMap.has(k)) {
        m.push({ k, n: 1 })
      } else {
        m[m.length - 1].n++
      }
    }
    return m
  }

  const getLegalTime = (s, timeformat) => {
    const dateValue = new Map([
      ['Y', 0],
      ['M', 0],
      ['D', 0],
      ['H', 0],
      ['m', 0],
      ['s', 0],
      ['S', 0]
    ])
    const m = new Map([
      ['Y', 12],
      ['M', 30],
      ['D', 24],
      ['H', 60],
      ['m', 60],
      ['s', 1000],
      ['S', 1]
    ])
    let storage = 0
    for (const k of dateValue.keys()) {
      if (s.has(k)) {
        dateValue.set(k, (timeformat.get(k) || 0) + storage)
        storage = 0
      } else {
        storage += (timeformat.get(k) || 0) * (m.get(k) || 0)
      }
    }
    if (!s.has('S') && (timeformat.get('S') || 0) > 500) {
      dateValue.set('s', (dateValue.get('s') || 0) + 1)
    }
    return dateValue
  }

  const getTimeStr = (legalTime, timeFormat = []) => {
    const fomatMap = new Set(['Y', 'M', 'D', 'H', 'm', 's', 'S'])
    const t = timeFormat.reduce((pre, cur) => {
      if (fomatMap.has(cur.k)) {
        return pre + numFormat(legalTime.get(cur.k) || 0, cur.n)
      }
      return pre + cur.k
    }, '')
    return t
  }

  const getDeduplication = (format) => {
    const fomatMap = new Set(['Y', 'M', 'D', 'H', 'm', 's', 'S'])
    const s = new Set()
    for (let i = 0; i < format.length; i++) {
      const k = format[i]
      if (fomatMap.has(k)) {
        s.add(k)
      }
    }
    return s
  }

  const timeformat = new Map([
    ['Y', 0],
    ['M', 0],
    ['D', 0],
    ['H', 0],
    ['m', 0],
    ['s', 0],
    ['S', 0]
  ])

  const year = Math.floor(leftTime / (365 * 24 * 60 * 60 * 1000))
  const month = Math.floor((leftTime / (30 * 24 * 60 * 60 * 1000)) % 12)
  const day = Math.floor((leftTime / (24 * 60 * 60 * 1000)) % 30)
  const hour = Math.floor((leftTime / (60 * 60 * 1000)) % 24)
  const minute = Math.floor((leftTime / (60 * 1000)) % 60)
  const second = Math.floor((leftTime / 1000) % 60)
  const millsecond = leftTime % 1000
  timeformat.set('Y', year)
  timeformat.set('M', month)
  timeformat.set('D', day)
  timeformat.set('H', hour)
  timeformat.set('m', minute)
  timeformat.set('s', second)
  timeformat.set('S', millsecond)

  const s = getDeduplication(format)
  const timeFormat = getTimeSplit(format)
  const legalTime = getLegalTime(s, timeformat)

  return getTimeStr(legalTime, timeFormat)
}
