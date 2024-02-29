<template>
  <view class="webgl-box">
    <view v-if="!loaded3D" class="loading-box">
      <view class="loading">
        <view class="loading-item loading-item-0"></view>
        <view class="loading-item loading-item-1"></view>
        <view class="loading-item loading-item-2"></view>
        <view class="loading-item loading-item-3"></view>
        <view class="loading-item loading-item-4"></view>
        <view class="loading-item loading-item-5"></view>
        <view class="loading-item loading-item-6"></view>
        <view class="loading-item loading-item-7"></view>
        <view class="loading-item loading-item-8"></view>
      </view>
    </view>
    <canvas
      class="js-gl webgl"
      type="webgl"
      :disable-scroll="true"
      @touchstart.stop="wxs.onTX"
      @touchmove.stop="wxs.onTX"
      @touchend.stop="wxs.onTX"
      @touchcancel.stop="wxs.onTX"
    ></canvas>
  </view>
</template>
<script lang="wxs" module="wxs">
var t1 = 0
module.exports = {
  onTX: function (e, ins) {
    var t2 = getDate().getTime()
    if (e.type==='touchend' || t2 - t1 > 40) {
      t1 = t2
      ins.callMethod('onTX', e)
    }
  }
}
</script>
<script setup>
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'
let _platform = null
let engine = null

const vm = getCurrentInstance()

const props = defineProps({
  src: {
    type: String,
    default: () => ''
  }
})

const loaded3D = ref(false)

onMounted(() => {
  if (!props.src) return
  setTimeout(() => {
    uni
      .createSelectorQuery()
      .in(vm)
      .select('.js-gl')
      .node()
      .exec(([res]) => {
        const canvas = (res || {}).node || null
        if (!canvas) return
        canvas.focus = () => {}
        _platform = new WechatPlatform(canvas)
        oasis.PlatformManager.set(_platform)

        const _engine = new oasis.WebGLEngine(canvas, { alpha: true, antialias: true })
        _engine.canvas.resizeByClientSize()
        _engine.sceneManager.activeScene.background.solidColor.set(0, 0, 0, 0)

        const rootEntity = _engine.sceneManager.activeScene.createRootEntity()

        const cameraEntity = rootEntity.createChild('camera')
        const camera = cameraEntity.addComponent(oasis.Camera)

        const orbitControl = cameraEntity.addComponent(OrbitControl)
        orbitControl.autoRotate = true
        orbitControl.autoRotateSpeed = 0.4
        orbitControl.rotateSpeed = 0.8
        orbitControl.dampingFactor = 0.08
        orbitControl.enableZoom = false
        orbitControl.enablePan = false

        _engine.sceneManager.activeScene.ambientLight.diffuseSolidColor.set(0.6, 0.6, 0.6, 0.6)

        const lightEntity1 = rootEntity.createChild('direct_light1')
        lightEntity1.addComponent(oasis.DirectLight)
        lightEntity1.transform.setRotation(-30, 0, 0)

        const lightEntity2 = rootEntity.createChild('direct_light2')
        lightEntity2.addComponent(oasis.DirectLight)
        lightEntity2.transform.setRotation(-30, 180, 0)

        _engine.resourceManager.load(props.src).then((asset) => {
          const { defaultSceneRoot } = asset

          rootEntity.addChild(defaultSceneRoot)

          const meshRenderers = []
          defaultSceneRoot.getComponentsIncludeChildren(oasis.MeshRenderer, meshRenderers)

          const boundingBox = new oasis.BoundingBox()

          boundingBox.min.set(0, 0, 0)
          boundingBox.max.set(0, 0, 0)
          meshRenderers.forEach((renderer) => {
            oasis.BoundingBox.merge(renderer.bounds, boundingBox, boundingBox)
          })

          const center = new oasis.Vector3()
          const extent = new oasis.Vector3()
          boundingBox.getExtent(extent)
          const size = extent.length()
          boundingBox.getCenter(center)

          orbitControl.target.set(center.x, center.y, center.z)
          cameraEntity.transform.setPosition(center.x, center.y, size * 3.5)

          camera.farClipPlane = size * 12

          if (camera.nearClipPlane > size) {
            camera.nearClipPlane = size / 10
          } else {
            camera.nearClipPlane = 0.1
          }
          orbitControl.maxDistance = size * 10

          loaded3D.value = true
        })
        _engine.run()
        engine = _engine
      })
  }, 360)
})

onUnmounted(() => {
  if (engine) {
    engine.destroy()
    oasis.PlatformManager.dispose()
  }
})

const onTX = (e) => {
  // if (e.touches.length > 1) return
  _platform && _platform.dispatchTouchEvent(e)
}

defineExpose({ onTX })
</script>

<script>
'use strict'

var oasis = require('../../static/platformize-oasis/index.js')

function _classCallCheck$8(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
var Platform = function Platform() {
  _classCallCheck$8(this, Platform)
}

function _classCallCheck$7(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
var $Blob = function $Blob(parts) {
  var options =
    arguments.length > 1 && arguments[1] !== void 0
      ? arguments[1]
      : {
          type: 'image/jpeg'
        }
  _classCallCheck$7(this, $Blob)
  this.parts = parts
  this.options = options
  // 安卓微信不支持image/jpg的解析, 需改为image/jpeg
  options.type = options.type.replace('jpg', 'jpeg')
}

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */ var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
// Use a lookup table to find the index.
var lookup = new Uint8Array(256)
for (var i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i
}
// 快一点
function encode(arrayBuffer) {
  var base64 = ''
  var bytes = new Uint8Array(arrayBuffer)
  var byteLength = bytes.byteLength
  var byteRemainder = byteLength % 3
  var mainLength = byteLength - byteRemainder
  var a, b, c, d
  var chunk
  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]
    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
    d = chunk & 63 // 63       = 2^6 - 1
    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += chars[a] + chars[b] + chars[c] + chars[d]
  }
  // Deal with the remaining bytes and padding
  if (byteRemainder == 1) {
    chunk = bytes[mainLength]
    a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2
    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4 // 3   = 2^2 - 1
    base64 += chars[a] + chars[b] + '=='
  } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]
    a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4
    // Set the 2 least significant bits to zero
    c = (chunk & 15) << 2 // 15    = 2^4 - 1
    base64 += chars[a] + chars[b] + chars[c] + '='
  }
  return base64
}

function _classCallCheck$6(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
function _instanceof$2(left, right) {
  if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left)
  } else {
    return left instanceof right
  }
}
var $URL = /*#__PURE__*/ (function () {
  function $URL() {
    _classCallCheck$6(this, $URL)
  }
  var _proto = $URL.prototype
  _proto.createObjectURL = function createObjectURL(obj) {
    if (_instanceof$2(obj, $Blob)) {
      // 更好的方式，使用wx.fileSystemManager写入临时文件来获取url，但是需要手动管理临时文件
      var base64 = encode(obj.parts[0])
      var url = 'data:'.concat(obj.options.type, ';base64,').concat(base64)
      return url
    }
    return ''
  }
  _proto.revokeObjectURL = function revokeObjectURL() {}
  return $URL
})()

/**
 * A lookup table for atob(), which converts an ASCII character to the
 * corresponding six-bit number.
 */ var keystr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
function atobLookup(chr) {
  var index = keystr.indexOf(chr)
  // Throw exception if character is not in the lookup string; should not be hit in tests
  return index < 0 ? undefined : index
}
/**
 * Implementation of atob() according to the HTML and Infra specs, except that
 * instead of throwing INVALID_CHARACTER_ERR we return null.
 */ function atob(data) {
  // Web IDL requires DOMStrings to just be converted using ECMAScript
  // ToString, which in our case amounts to using a template literal.
  data = ''.concat(data)
  // "Remove all ASCII whitespace from data."
  data = data.replace(/[ \t\n\f\r]/g, '')
  // "If data's length divides by 4 leaving no remainder, then: if data ends
  // with one or two U+003D (=) code points, then remove them from data."
  if (data.length % 4 === 0) {
    data = data.replace(/==?$/, '')
  }
  // "If data's length divides by 4 leaving a remainder of 1, then return
  // failure."
  //
  // "If data contains a code point that is not one of
  //
  // U+002B (+)
  // U+002F (/)
  // ASCII alphanumeric
  //
  // then return failure."
  if (data.length % 4 === 1 || /[^+/0-9A-Za-z]/.test(data)) {
    return ''
  }
  // "Let output be an empty byte sequence."
  var output = ''
  // "Let buffer be an empty buffer that can have bits appended to it."
  //
  // We append bits via left-shift and or.  accumulatedBits is used to track
  // when we've gotten to 24 bits.
  var buffer = 0
  var accumulatedBits = 0
  // "Let position be a position variable for data, initially pointing at the
  // start of data."
  //
  // "While position does not point past the end of data:"
  for (var i = 0; i < data.length; i++) {
    // "Find the code point pointed to by position in the second column of
    // Table 1: The Base 64 Alphabet of RFC 4648. Let n be the number given in
    // the first cell of the same row.
    //
    // "Append to buffer the six bits corresponding to n, most significant bit
    // first."
    //
    // atobLookup() implements the table from RFC 4648.
    buffer <<= 6
    // @ts-ignore
    buffer |= atobLookup(data[i])
    accumulatedBits += 6
    // "If buffer has accumulated 24 bits, interpret them as three 8-bit
    // big-endian numbers. Append three bytes with values equal to those
    // numbers to output, in the same order, and then empty buffer."
    if (accumulatedBits === 24) {
      output += String.fromCharCode((buffer & 0xff0000) >> 16)
      output += String.fromCharCode((buffer & 0xff00) >> 8)
      output += String.fromCharCode(buffer & 0xff)
      buffer = accumulatedBits = 0
    }
    // "Advance position by 1."
  }
  // "If buffer is not empty, it contains either 12 or 18 bits. If it contains
  // 12 bits, then discard the last four and interpret the remaining eight as
  // an 8-bit big-endian number. If it contains 18 bits, then discard the last
  // two and interpret the remaining 16 as two 8-bit big-endian numbers. Append
  // the one or two bytes with values equal to those one or two numbers to
  // output, in the same order."
  if (accumulatedBits === 12) {
    buffer >>= 4
    output += String.fromCharCode(buffer)
  } else if (accumulatedBits === 18) {
    buffer >>= 2
    output += String.fromCharCode((buffer & 0xff00) >> 8)
    output += String.fromCharCode(buffer & 0xff)
  }
  // "Return output."
  return output
}

function _classCallCheck$5(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
var _events = new WeakMap()
var Touch = function Touch(touch) {
  _classCallCheck$5(this, Touch)
  // CanvasTouch{identifier, x, y}
  // Touch{identifier, pageX, pageY, clientX, clientY, force}
  this.identifier = touch.identifier
  this.force = touch.force === undefined ? 1 : touch.force
  this.pageX = touch.pageX === undefined ? touch.x : touch.pageX
  this.pageY = touch.pageY === undefined ? touch.y : touch.pageY
  this.clientX = touch.clientX === undefined ? touch.x : touch.clientX
  this.clientY = touch.clientY === undefined ? touch.y : touch.clientY
  this.screenX = this.pageX
  this.screenY = this.pageY
}
var $EventTarget = /*#__PURE__*/ (function () {
  function $EventTarget() {
    _classCallCheck$5(this, $EventTarget)
    _events.set(this, {})
  }
  var _proto = $EventTarget.prototype
  _proto.addEventListener = function addEventListener(type, listener) {
    var events = _events.get(this)
    if (!events) {
      events = {}
      _events.set(this, events)
    }
    if (!events[type]) {
      events[type] = []
    }
    events[type].push(listener)
    // if (options.capture) {
    //   // console.warn('EventTarget.addEventListener: options.capture is not implemented.')
    // }
    // if (options.once) {
    //   // console.warn('EventTarget.addEventListener: options.once is not implemented.')
    // }
    // if (options.passive) {
    //   // console.warn('EventTarget.addEventListener: options.passive is not implemented.')
    // }
  }
  _proto.removeEventListener = function removeEventListener(type, listener) {
    var events = _events.get(this)
    if (events) {
      var listeners = events[type]
      if (listeners && listeners.length > 0) {
        for (var i = listeners.length; i--; i > 0) {
          if (listeners[i] === listener) {
            listeners.splice(i, 1)
            break
          }
        }
      }
    }
  }
  _proto.dispatchEvent = function dispatchEvent() {
    var event =
      arguments.length > 0 && arguments[0] !== void 0
        ? arguments[0]
        : {
            type: ''
          }
    if (typeof event.preventDefault !== 'function') {
      event.preventDefault = function () {}
    }
    if (typeof event.stopPropagation !== 'function') {
      event.stopPropagation = function () {}
    }
    var events = _events.get(this)
    if (events) {
      var listeners = events[event.type]
      if (listeners) {
        for (var i = 0; i < listeners.length; i++) {
          listeners[i](event)
        }
      }
    }
    // @ts-ignore
    if (typeof this['on'.concat(event.type)] === 'function') {
      // @ts-ignore
      this['on'.concat(event.type)].call(this, event)
    }
  }
  _proto.releasePointerCapture = function releasePointerCapture() {}
  _proto.setPointerCapture = function setPointerCapture() {}
  return $EventTarget
})()

function copyProperties(target, source) {
  var _iteratorNormalCompletion = true,
    _didIteratorError = false,
    _iteratorError = undefined
  try {
    for (
      var _iterator = Object.getOwnPropertyNames(source)[Symbol.iterator](), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
      var key = _step.value
      if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
        var desc = Object.getOwnPropertyDescriptor(source, key)
        desc && Object.defineProperty(target, key, desc)
      }
    }
  } catch (err) {
    _didIteratorError = true
    _iteratorError = err
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return()
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError
      }
    }
  }
}
function createImage(canvas) {
  var img = canvas.createImage()
  img.addEventListener = function (name, cb) {
    return (img['on'.concat(name)] = cb.bind(img))
  }
  img.removeEventListener = function (name) {
    return (img['on'.concat(name)] = null)
  }
  return img
}

/**
 * Module dependencies.
 */ /**
 * Expose `parse`.
 */ /**
 * Parse the given string of `xml`.
 *
 * @param {String} xml
 * @return {Object}
 * @api public
 */ function parse(xml) {
  var document = /**
   * XML document.
   */ function document() {
    return {
      declaration: declaration(),
      root: tag(),
      isXML: true
    }
  }
  var declaration = /**
   * Declaration.
   */ function declaration() {
    var m = match(/^<\?xml\s*/)
    if (!m) return
    // tag
    var node = {
      attributes: {},
      children: []
    }
    // attributes
    while (!(eos() || is('?>'))) {
      var attr = attribute()
      if (!attr) return node
      node.attributes[attr.name] = attr.value
    }
    match(/\?>\s*/)
    // remove DOCTYPE
    // <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
    //      "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    match(/<!DOCTYPE[^>]*>\s/)
    return node
  }
  var content = /**
   * Text content.
   */ function content() {
    var m = match(/^([^<]*)/)
    if (m) return m[1]
    return ''
  }
  var attribute = /**
   * Attribute.
   */ function attribute() {
    var m = match(/([\w:-]+)\s*=\s*("[^"]*"|'[^']*'|\w+)\s*/)
    if (!m) return
    return {
      name: m[1],
      value: strip(m[2])
    }
  }
  var strip = /**
   * Strip quotes from `val`.
   */ function strip(val) {
    return val.replace(/^['"]|['"]$/g, '')
  }
  var match = /**
   * Match `re` and advance the string.
   */ function match(re) {
    var m = xml.match(re)
    if (!m) return
    xml = xml.slice(m[0].length)
    return m
  }
  var eos = /**
   * End-of-source.
   */ function eos() {
    return xml.length == 0
  }
  var is = /**
   * Check for `prefix`.
   */ function is(prefix) {
    return xml.indexOf(prefix) == 0
  }
  xml = xml.trim()
  // strip comments
  xml = xml.replace(/<!--[\s\S]*?-->/g, '')
  return document()
  /**
   * Tag.
   */ function tag() {
    var m = match(/^<([\w-:.]+)\s*/)
    if (!m) return
    // name
    var node = {
      name: m[1],
      attributes: {},
      children: []
    }
    // attributes
    while (!(eos() || is('>') || is('?>') || is('/>'))) {
      var attr = attribute()
      if (!attr) return node
      node.attributes[attr.name] = attr.value
    }
    // self closing tag
    if (match(/^\s*\/>\s*/)) {
      return node
    }
    match(/\??>\s*/)
    // @ts-ignore content
    node.content = content()
    // children
    var child
    while ((child = tag())) {
      node.children.push(child)
    }
    // closing
    match(/^<\/[\w-:.]+>\s*/)
    return node
  }
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]
  return arr2
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr
}
function _classCallCheck$4(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) || arr['@@iterator']
  if (_i == null) return
  var _arr = []
  var _n = true
  var _d = false
  var _s, _e
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value)
      if (i && _arr.length === i) break
    }
  } catch (err) {
    _d = true
    _e = err
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']()
    } finally {
      if (_d) throw _e
    }
  }
  return _arr
}
function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}
function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  )
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
  var n = Object.prototype.toString.call(o).slice(8, -1)
  if (n === 'Object' && o.constructor) n = o.constructor.name
  if (n === 'Map' || n === 'Set') return Array.from(n)
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen)
}
function walkTree(node, processer) {
  processer(node)
  node.children.forEach(function (i) {
    return walkTree(i, processer)
  })
}
var $DOMParser = /*#__PURE__*/ (function () {
  function $DOMParser() {
    _classCallCheck$4(this, $DOMParser)
  }
  var _proto = $DOMParser.prototype
  _proto.parseFromString = function parseFromString(str) {
    var xml = parse(str)
    var nodeBase = {
      // @ts-ignore
      hasAttribute: function hasAttribute(key) {
        // @ts-ignore
        return this.attributes[key] !== undefined
      },
      // @ts-ignore
      getAttribute: function getAttribute(key) {
        // @ts-ignore
        return this.attributes[key]
      },
      getElementsByTagName: function getElementsByTagName(tag) {
        // 看了dae的文件结构，xml的节点不算庞大，所以还能接受
        var result = []
        // @ts-ignore
        this.childNodes.forEach(function (i) {
          return walkTree(i, function (node) {
            return tag === node.name && result.push(node)
          })
        })
        return result
      }
    }
    // patch xml
    xml.root &&
      walkTree(xml.root, function (node) {
        node.nodeType = 1
        node.nodeName = node.name
        node.style = new Proxy(
          (node.attributes.style || '').split(';').reduce(function (acc, curr) {
            if (curr) {
              var _curr_split = _slicedToArray(curr.split(':'), 2),
                key = _curr_split[0],
                value = _curr_split[1]
              acc[key.trim()] = value.trim()
            }
            return acc
          }, {}),
          {
            get: function get(target, key) {
              return target[key] || ''
            }
          }
        )
        node.textContent = node.content
        node.childNodes = node.children
        // @ts-ignore
        node.__proto__ = nodeBase
      })
    var out = {
      documentElement: xml.root,
      childNodes: [xml.root]
    }
    // @ts-ignore
    out.__proto__ = nodeBase
    return out
  }
  return $DOMParser
})()

function _classCallCheck$3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
function _instanceof$1(left, right) {
  if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left)
  } else {
    return left instanceof right
  }
}
var $TextDecoder = /*#__PURE__*/ (function () {
  function $TextDecoder() {
    _classCallCheck$3(this, $TextDecoder)
  }
  var _proto = $TextDecoder.prototype
  /**
   * 不支持 UTF-8 code points 大于 1 字节
   * @see https://stackoverflow.com/questions/17191945/conversion-between-utf-8-arraybuffer-and-string
   * @param {Uint8Array|ArrayBuffer} uint8Array
   */ _proto.decode = function decode(input) {
    var uint8Array = _instanceof$1(input, ArrayBuffer) ? new Uint8Array(input) : input
    // from threejs LoaderUtils.js
    var s = ''
    // Implicitly assumes little-endian.
    for (var i = 0, il = uint8Array.length; i < il; i++) {
      s += String.fromCharCode(uint8Array[i])
    }
    try {
      // merges multi-byte utf-8 characters.
      return decodeURIComponent(escape(s))
    } catch (e) {
      // see #16358
      return s
    }
    // return String.fromCharCode.apply(null, uint8Array);
  }
  return $TextDecoder
})()

var $performance = {
  now: function now() {
    return Date.now()
  }
}

// @ts-nocheck
function _assertThisInitialized$2(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }
  return self
}
function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
function isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}))
    return true
  } catch (e) {
    return false
  }
}
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null]
      a.push.apply(a, args)
      var Constructor = Function.bind.apply(Parent, a)
      var instance = new Constructor()
      if (Class) _setPrototypeOf$3(instance, Class.prototype)
      return instance
    }
  }
  return _construct.apply(null, arguments)
}
function _getPrototypeOf$2(o) {
  _getPrototypeOf$2 = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf$2(o)
}
function _inherits$2(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  })
  if (superClass) _setPrototypeOf$3(subClass, superClass)
}
function _instanceof(left, right) {
  if (right != null && typeof Symbol !== 'undefined' && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left)
  } else {
    return left instanceof right
  }
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf('[native code]') !== -1
}
function _possibleConstructorReturn$2(self, call) {
  if (call && (_typeof$2(call) === 'object' || typeof call === 'function')) {
    return call
  }
  return _assertThisInitialized$2(self)
}
function _setPrototypeOf$3(o, p) {
  _setPrototypeOf$3 =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }
  return _setPrototypeOf$3(o, p)
}
var _typeof$2 = function (obj) {
  '@swc/helpers - typeof'
  return obj && typeof Symbol !== 'undefined' && obj.constructor === Symbol ? 'symbol' : typeof obj
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === 'function' ? new Map() : undefined
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class
    if (typeof Class !== 'function') {
      throw new TypeError('Super expression must either be null or a function')
    }
    if (typeof _cache !== 'undefined') {
      if (_cache.has(Class)) return _cache.get(Class)
      _cache.set(Class, Wrapper)
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf$2(this).constructor)
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    })
    return _setPrototypeOf$3(Wrapper, Class)
  }
  return _wrapNativeSuper(Class)
}
function _isNativeReflectConstruct$2() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}))
    return true
  } catch (e) {
    return false
  }
}
function _createSuper$2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$2()
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$2(Derived),
      result
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$2(this).constructor
      result = Reflect.construct(Super, arguments, NewTarget)
    } else {
      result = Super.apply(this, arguments)
    }
    return _possibleConstructorReturn$2(this, result)
  }
}
var _requestHeader = new WeakMap()
var _responseHeader = new WeakMap()
var _requestTask = new WeakMap()
function _triggerEvent(type) {
  var event = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  event.target = event.target || this
  if (typeof this['on'.concat(type)] === 'function') {
    this['on'.concat(type)].call(this, event)
  }
}
function _changeReadyState(readyState) {
  var event = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
  this.readyState = readyState
  event.readyState = readyState
  _triggerEvent.call(this, 'readystatechange', event)
}
function _isRelativePath(url) {
  return !/^(http|https|ftp|wxfile):\/\/.*/i.test(url)
}
var $XMLHttpRequest = /*#__PURE__*/ (function (EventTarget) {
  _inherits$2($XMLHttpRequest, EventTarget)
  var _super = _createSuper$2($XMLHttpRequest)
  function $XMLHttpRequest() {
    _classCallCheck$2(this, $XMLHttpRequest)
    var _this
    _this = _super.call(this)
    _this.runtime = uni.getSystemInfoSync().platform
    /*
     * TODO 这一批事件应该是在 XMLHttpRequestEventTarget.prototype 上面的
     */ _this.onabort = null
    _this.onerror = null
    _this.onload = null
    _this.onloadstart = null
    _this.onprogress = null
    _this.ontimeout = null
    _this.onloadend = null
    _this.onreadystatechange = null
    _this.readyState = 0
    _this.response = null
    _this.responseText = null
    _this.responseType = 'text'
    _this.dataType = 'string'
    _this.responseXML = null
    _this.status = 0
    _this.statusText = ''
    _this.upload = {}
    _this.withCredentials = false
    _requestHeader.set(_assertThisInitialized$2(_this), {
      'content-type': 'application/x-www-form-urlencoded'
    })
    _responseHeader.set(_assertThisInitialized$2(_this), {})
    return _this
  }
  var _proto = $XMLHttpRequest.prototype
  _proto.abort = function abort() {
    var myRequestTask = _requestTask.get(this)
    if (myRequestTask) {
      myRequestTask.abort()
    }
  }
  _proto.getAllResponseHeaders = function getAllResponseHeaders() {
    var responseHeader = _responseHeader.get(this)
    return Object.keys(responseHeader)
      .map(function (header) {
        return ''.concat(header, ': ').concat(responseHeader[header])
      })
      .join('\n')
  }
  _proto.getResponseHeader = function getResponseHeader(header) {
    return _responseHeader.get(this)[header]
  }
  _proto.open = function open(method, url /* async, user, password 这几个参数在小程序内不支持*/) {
    this._method = method
    this._url = url
    _changeReadyState.call(this, $XMLHttpRequest.OPENED)
  }
  _proto.overrideMimeType = function overrideMimeType() {}
  _proto.send = function send() {
    var data = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ''
    var _this = this
    if (this.readyState !== $XMLHttpRequest.OPENED) {
      throw new Error(
        "Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED."
      )
    } else {
      var url = this._url
      var header = _requestHeader.get(this)
      var responseType = this.responseType
      var dataType = this.dataType
      var relative = _isRelativePath(url)
      var encoding
      if (responseType === 'arraybuffer');
      else {
        encoding = 'utf8'
      }
      if (responseType === 'json') {
        dataType = 'json'
        responseType = 'text'
      }
      delete this.response
      this.response = null
      var resolved = false
      var onSuccess = function (param) {
        var data = param.data,
          statusCode = param.statusCode,
          header = param.header
        // console.log('onSuccess', url);
        if (resolved) return
        resolved = true
        statusCode = statusCode === undefined ? 200 : statusCode
        if (typeof data !== 'string' && !_instanceof(data, ArrayBuffer) && dataType !== 'json') {
          try {
            data = JSON.stringify(data)
          } catch (e) {}
        }
        _this.status = statusCode
        if (header) {
          _responseHeader.set(_this, header)
        }
        _triggerEvent.call(_this, 'loadstart')
        _changeReadyState.call(_this, $XMLHttpRequest.HEADERS_RECEIVED)
        _changeReadyState.call(_this, $XMLHttpRequest.LOADING)
        _this.response = data
        if (_instanceof(data, ArrayBuffer)) {
          Object.defineProperty(_this, 'responseText', {
            enumerable: true,
            configurable: true,
            get: function get() {
              throw 'InvalidStateError : responseType is ' + this.responseType
            }
          })
        } else {
          _this.responseText = data
        }
        _changeReadyState.call(_this, $XMLHttpRequest.DONE)
        _triggerEvent.call(_this, 'load')
        _triggerEvent.call(_this, 'loadend')
      }
      var onFail = function (param) {
        var errMsg = param.errMsg
        // TODO 规范错误
        if (resolved) return
        resolved = true
        if (errMsg.indexOf('abort') !== -1) {
          _triggerEvent.call(_this, 'abort')
        } else {
          _triggerEvent.call(_this, 'error', {
            message: errMsg
          })
        }
        _triggerEvent.call(_this, 'loadend')
        if (relative) {
          // 用户即使没监听error事件, 也给出相应的警告
          console.warn(errMsg)
        }
      }
      if (relative) {
        var fs = uni.getFileSystemManager()
        var options = {
          filePath: url,
          success: onSuccess,
          fail: onFail
        }
        if (encoding) {
          options['encoding'] = encoding
        }
        fs.readFile(options)
        return
      }
      // IOS在某些情况下不会触发onSuccess...
      var usePatch =
        responseType === 'arraybuffer' && this.runtime === 'ios' && $XMLHttpRequest.useFetchPatch
      uni.request({
        data: data,
        url: url,
        method: this._method.toUpperCase(),
        header: header,
        dataType: dataType,
        responseType: responseType,
        enableCache: false,
        success: onSuccess,
        // success: usePatch ? undefined : onSuccess,
        fail: onFail
      })
      if (usePatch) {
        setTimeout(function () {
          uni.request({
            data: data,
            url: url,
            method: this._method,
            header: header,
            dataType: dataType,
            responseType: responseType,
            enableCache: true,
            success: onSuccess,
            fail: onFail
          })
        }, $XMLHttpRequest.fetchPatchDelay)
      }
    }
  }
  _proto.setRequestHeader = function setRequestHeader(header, value) {
    var myHeader = _requestHeader.get(this)
    myHeader[header] = value
    _requestHeader.set(this, myHeader)
  }
  _proto.addEventListener = function addEventListener(type, listener) {
    var _this = this
    if (typeof listener !== 'function') {
      return
    }
    this['on' + type] = function () {
      var event = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
      event.target = event.target || _this
      listener.call(_this, event)
    }
  }
  _proto.removeEventListener = function removeEventListener(type, listener) {
    if (this['on' + type] === listener) {
      this['on' + type] = null
    }
  }
  return $XMLHttpRequest
})(_wrapNativeSuper($EventTarget))
// TODO 没法模拟 HEADERS_RECEIVED 和 LOADING 两个状态
$XMLHttpRequest.UNSEND = 0
$XMLHttpRequest.OPENED = 1
$XMLHttpRequest.HEADERS_RECEIVED = 2
$XMLHttpRequest.LOADING = 3
$XMLHttpRequest.DONE = 4
// 某些情况下IOS会不success不触发。。。
$XMLHttpRequest.useFetchPatch = false
$XMLHttpRequest.fetchPatchDelay = 200

/// <reference types="@types/wechat-miniprogram" />
/// <reference types="@types/offscreencanvas" />
function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }
  return self
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    })
  } else {
    obj[key] = value
  }
  return obj
}
function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf$1(o)
}
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  })
  if (superClass) _setPrototypeOf$2(subClass, superClass)
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {}
    var ownKeys = Object.keys(source)
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable
        })
      )
    }
    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key])
    })
  }
  return target
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    }
    keys.push.apply(keys, symbols)
  }
  return keys
}
function _objectSpreadProps(target, source) {
  source = source != null ? source : {}
  if (Object.getOwnPropertyDescriptors) {
    Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
  } else {
    ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
    })
  }
  return target
}
function _possibleConstructorReturn$1(self, call) {
  if (call && (_typeof$1(call) === 'object' || typeof call === 'function')) {
    return call
  }
  return _assertThisInitialized$1(self)
}
function _setPrototypeOf$2(o, p) {
  _setPrototypeOf$2 =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }
  return _setPrototypeOf$2(o, p)
}
var _typeof$1 = function (obj) {
  '@swc/helpers - typeof'
  return obj && typeof Symbol !== 'undefined' && obj.constructor === Symbol ? 'symbol' : typeof obj
}
function _isNativeReflectConstruct$1() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}))
    return true
  } catch (e) {
    return false
  }
}
function _createSuper$1(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$1()
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$1(Derived),
      result
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$1(this).constructor
      result = Reflect.construct(Super, arguments, NewTarget)
    } else {
      result = Super.apply(this, arguments)
    }
    return _possibleConstructorReturn$1(this, result)
  }
}
function OffscreenCanvas() {
  // @ts-ignore
  return uni.createOffscreenCanvas()
}
var WechatPlatform$1 = /*#__PURE__*/ (function (Platform) {
  _inherits$1(WechatPlatform, Platform)
  var _super = _createSuper$1(WechatPlatform)
  function WechatPlatform(canvas, width, height) {
    _classCallCheck$1(this, WechatPlatform)
    var _this
    _this = _super.call(this)
    _this.enabledDeviceMotion = false
    _this.canvasRect = {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
    var systemInfo = uni.getSystemInfoSync()
    var isAndroid = systemInfo.platform === 'android'
    // @ts-ignore
    _this.canvas = canvas
    _this.canvasW = width === undefined ? canvas.width : width
    _this.canvasH = height === undefined ? canvas.height : height
    _this.canvasRect.width = _this.canvasW
    _this.canvasRect.height = _this.canvasH
    var document = {
      createElementNS: function createElementNS(_, type) {
        if (type === 'canvas') return canvas
        if (type === 'img') return createImage(canvas)
      },
      createElement: function createElement(type) {
        if (type === 'canvas') return canvas
        if (type === 'img') return createImage(canvas)
      },
      body: {}
    }
    var img = createImage(canvas)
    var Image = function () {
      return createImage(canvas)
    }
    var URL = new $URL()
    var window = {
      innerWidth: systemInfo.windowWidth,
      innerHeight: systemInfo.windowHeight,
      devicePixelRatio: systemInfo.pixelRatio,
      AudioContext: function AudioContext() {},
      requestAnimationFrame: _this.canvas.requestAnimationFrame,
      cancelAnimationFrame: _this.canvas.cancelAnimationFrame,
      DeviceOrientationEvent: {
        requestPermission: function requestPermission() {
          return Promise.resolve('granted')
        }
      },
      URL: URL,
      Image: Image,
      DOMParser: $DOMParser,
      TextDecoder: $TextDecoder,
      Blob: $Blob,
      performance: $performance
    }
    ;[canvas, document, window, document.body].forEach(function (i) {
      // @ts-ignore
      var old = i.__proto__
      // @ts-ignore
      i.__proto__ = {}
      // @ts-ignore
      i.__proto__.__proto__ = old
      // @ts-ignore
      copyProperties(i.__proto__, $EventTarget.prototype)
    })
    _this.polyfill = {
      window: window,
      document: document,
      // @ts-expect-error
      Blob: $Blob,
      // @ts-expect-error
      DOMParser: $DOMParser,
      // @ts-expect-error
      TextDecoder: $TextDecoder,
      // @ts-expect-error
      XMLHttpRequest: $XMLHttpRequest,
      // @ts-expect-error
      OffscreenCanvas: OffscreenCanvas,
      // @ts-expect-error
      URL: URL,
      Image: Image,
      HTMLImageElement: img.constructor,
      atob: atob,
      global: window,
      createImageBitmap: undefined,
      cancelAnimationFrame: window.cancelAnimationFrame,
      requestAnimationFrame: window.requestAnimationFrame,
      performance: window.performance
    }
    _this.patchCanvas()
    _this.onDeviceMotionChange = function (e) {
      e.type = 'deviceorientation'
      if (isAndroid) {
        e.alpha *= -1
        e.beta *= -1
        e.gamma *= -1
      }
      window.dispatchEvent(e)
    }
    return _this
  }
  var _proto = WechatPlatform.prototype
  _proto.patchCanvas = function patchCanvas() {
    var _this = this
    var _this1 = this,
      canvasH = _this1.canvasH,
      canvasW = _this1.canvasW,
      canvas = _this1.canvas
    Object.defineProperty(this.canvas, 'style', {
      get: function get() {
        return {
          width: this.width + 'px',
          height: this.height + 'px'
        }
      }
    })
    Object.defineProperty(this.canvas, 'clientHeight', {
      get: function get() {
        return canvasH || this.height
      }
    })
    Object.defineProperty(this.canvas, 'clientWidth', {
      get: function get() {
        return canvasW || this.width
      }
    })
    // @ts-ignore
    canvas.ownerDocument = this.document
    // @ts-ignore
    canvas.getBoundingClientRect = function () {
      return _this.canvasRect
    }
    // @ts-ignore
    canvas._getContext = this.canvas.getContext
    canvas.getContext = function getContext() {
      var _canvas
      if (arguments[0] !== 'webgl') return null
      // @ts-ignore
      return (_canvas = canvas)._getContext.apply(_canvas, arguments)
    }
  }
  // 某些情况下IOS会不success不触发。。。
  _proto.patchXHR = function patchXHR() {
    $XMLHttpRequest.useFetchPatch = true
    return this
  }
  _proto.enableDeviceOrientation = function enableDeviceOrientation(interval) {
    var _this = this
    return new Promise(function (resolve, reject) {
      uni.onDeviceMotionChange(_this.onDeviceMotionChange)
      uni.startDeviceMotionListening({
        interval: interval,
        success: function (e) {
          resolve(e)
          _this.enabledDeviceMotion = true
        },
        fail: reject
      })
    })
  }
  _proto.disableDeviceOrientation = function disableDeviceOrientation() {
    var _this = this
    return new Promise(function (resolve, reject) {
      uni.offDeviceMotionChange(_this.onDeviceMotionChange)
      _this.enabledDeviceMotion &&
        uni.stopDeviceMotionListening({
          success: function () {
            resolve(true)
            _this.enabledDeviceMotion = false
          },
          fail: reject
        })
    })
  }
  _proto.dispatchTouchEvent = function dispatchTouchEvent() {
    var e =
      arguments.length > 0 && arguments[0] !== void 0
        ? arguments[0]
        : {
            touches: [],
            changedTouches: [],
            timeStamp: 0,
            type: ''
          }
    var target = _objectSpread({}, this)
    var changedTouches = e.changedTouches.map(function (touch) {
      return new Touch(touch)
    })
    var event = {
      changedTouches: changedTouches,
      touches: e.touches.map(function (touch) {
        return new Touch(touch)
      }),
      targetTouches: Array.prototype.slice.call(
        e.touches.map(function (touch) {
          return new Touch(touch)
        })
      ),
      timeStamp: e.timeStamp,
      target: target,
      currentTarget: target,
      type: e.type,
      cancelBubble: false,
      cancelable: false
    }
    this.canvas.dispatchEvent(event)
    if (changedTouches.length) {
      var touch = changedTouches[0]
      var pointerEvent = {
        pageX: touch.pageX,
        pageY: touch.pageY,
        offsetX: touch.pageX,
        offsetY: touch.pageY,
        pointerId: touch.identifier,
        // to fix oasis controls https://www.w3.org/TR/uievents/#dom-mouseevent-buttons
        buttons: 1,
        type:
          {
            touchstart: 'pointerdown',
            touchmove: 'pointermove',
            touchend: 'pointerup'
          }[e.type] || '',
        pointerType: 'touch'
      }
      this.canvas.dispatchEvent(pointerEvent)
      if (e.type === 'touchend')
        this.canvas.dispatchEvent(
          _objectSpreadProps(_objectSpread({}, pointerEvent), {
            type: 'pointerout'
          })
        )
    }
  }
  _proto.dispose = function dispose() {
    this.disableDeviceOrientation()
    // 缓解ios内存泄漏, 前后进出页面多几次，降低pixelRatio也可行
    this.canvas.width = 0
    this.canvas.height = 0
    // @ts-ignore
    if (this.canvas) this.canvas.ownerDocument = null
    // @ts-ignore
    this.onDeviceMotionChange = null
    // @ts-ignore
    this.canvas = null
  }
  return WechatPlatform
})(Platform)

/// <reference types="wechat-miniprogram" />
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }
  return self
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  })
  if (superClass) _setPrototypeOf$1(subClass, superClass)
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call
  }
  return _assertThisInitialized(self)
}
function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }
  return _setPrototypeOf$1(o, p)
}
var _typeof = function (obj) {
  '@swc/helpers - typeof'
  return obj && typeof Symbol !== 'undefined' && obj.constructor === Symbol ? 'symbol' : typeof obj
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}))
    return true
  } catch (e) {
    return false
  }
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct()
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor
      result = Reflect.construct(Super, arguments, NewTarget)
    } else {
      result = Super.apply(this, arguments)
    }
    return _possibleConstructorReturn(this, result)
  }
}
var WechatPlatform = /*#__PURE__*/ (function (WechatPlatformBase) {
  _inherits(WechatPlatform, WechatPlatformBase)
  var _super = _createSuper(WechatPlatform)
  function WechatPlatform(canvas, width, height) {
    _classCallCheck(this, WechatPlatform)
    var _this
    _this = _super.call(this, canvas, width, height)
    _this.polyfill.$defaultWebGLExtensions = {
      OES_vertex_array_object: null
    }
    _this.polyfill.HTMLCanvasElement = canvas.constructor
    return _this
  }
  return WechatPlatform
})(WechatPlatform$1)

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  Object.defineProperty(Constructor, 'prototype', {
    writable: false
  })
  return Constructor
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype)
  subClass.prototype.constructor = subClass
  _setPrototypeOf(subClass, superClass)
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf
    ? Object.setPrototypeOf.bind()
    : function _setPrototypeOf(o, p) {
        o.__proto__ = p
        return o
      }
  return _setPrototypeOf(o, p)
}

// Prevent gimbal lock.
var ESP$1 = oasis.MathUtil.zeroTolerance

// Spherical.
var Spherical = /*#__PURE__*/ (function () {
  function Spherical(radius, phi, theta) {
    this.radius = radius
    this.phi = phi
    this.theta = theta
    this.radius = radius !== undefined ? radius : 1.0
    this.phi = phi !== undefined ? phi : 0
    this.theta = theta !== undefined ? theta : 0
  }
  var _proto = Spherical.prototype
  _proto.set = function set(radius, phi, theta) {
    this.radius = radius
    this.phi = phi
    this.theta = theta
    return this
  }
  _proto.makeSafe = function makeSafe() {
    this.phi = oasis.MathUtil.clamp(this.phi, ESP$1, Math.PI - ESP$1)
    return this
  }
  _proto.setFromVec3 = function setFromVec3(value) {
    this.radius = value.length()
    if (this.radius === 0) {
      this.theta = 0
      this.phi = 0
    } else {
      this.theta = Math.atan2(value.x, value.z)
      this.phi = Math.acos(oasis.MathUtil.clamp(value.y / this.radius, -1, 1))
    }
    return this
  }
  _proto.setToVec3 = function setToVec3(value) {
    var radius = this.radius,
      phi = this.phi,
      theta = this.theta
    var sinPhiRadius = Math.sin(phi) * radius
    value.set(
      sinPhiRadius * Math.sin(theta),
      radius * Math.cos(phi),
      sinPhiRadius * Math.cos(theta)
    )
    return this
  }
  return Spherical
})()

// Prevent universal lock.
oasis.MathUtil.zeroTolerance

var ControlHandlerType
;(function (ControlHandlerType) {
  ControlHandlerType[(ControlHandlerType['None'] = 0)] = 'None'
  ControlHandlerType[(ControlHandlerType['ROTATE'] = 1)] = 'ROTATE'
  ControlHandlerType[(ControlHandlerType['ZOOM'] = 2)] = 'ZOOM'
  ControlHandlerType[(ControlHandlerType['PAN'] = 4)] = 'PAN'
  ControlHandlerType[(ControlHandlerType['All'] = 7)] = 'All'
})(ControlHandlerType || (ControlHandlerType = {}))

/**
 *  Static interface implement decorator.
 *  https://stackoverflow.com/questions/13955157/how-to-define-static-property-in-typescript-interface
 */
function StaticInterfaceImplement() {
  return function (constructor) {}
}

var _dec$2, _class$2
var ControlKeyboard =
  ((_dec$2 = StaticInterfaceImplement()),
  _dec$2(
    (_class$2 = /*#__PURE__*/ (function () {
      function ControlKeyboard() {}
      ControlKeyboard.onUpdateHandler = function onUpdateHandler(input) {
        if (
          input.isKeyHeldDown(oasis.Keys.ArrowLeft) ||
          input.isKeyHeldDown(oasis.Keys.ArrowRight) ||
          input.isKeyHeldDown(oasis.Keys.ArrowUp) ||
          input.isKeyHeldDown(oasis.Keys.ArrowDown)
        ) {
          return ControlHandlerType.PAN
        } else {
          return ControlHandlerType.None
        }
      }
      ControlKeyboard.onUpdateDelta = function onUpdateDelta(control, outDelta) {
        var keyPanSpeed = control.keyPanSpeed,
          input = control.input
        outDelta.x = outDelta.y = 0
        if (input.isKeyHeldDown(oasis.Keys.ArrowLeft)) {
          outDelta.x += keyPanSpeed
        }
        if (input.isKeyHeldDown(oasis.Keys.ArrowRight)) {
          outDelta.x -= keyPanSpeed
        }
        if (input.isKeyHeldDown(oasis.Keys.ArrowUp)) {
          outDelta.y += keyPanSpeed
        }
        if (input.isKeyHeldDown(oasis.Keys.ArrowDown)) {
          outDelta.y -= keyPanSpeed
        }
      }
      return ControlKeyboard
    })())
  ) || _class$2)

var _dec$1, _class$1, _class2
var DeltaType
;(function (DeltaType) {
  DeltaType[(DeltaType['Moving'] = 0)] = 'Moving'
  DeltaType[(DeltaType['Distance'] = 1)] = 'Distance'
})(DeltaType || (DeltaType = {}))
var ControlPointer =
  ((_dec$1 = StaticInterfaceImplement()),
  _dec$1(
    (_class$1 =
      ((_class2 = /*#__PURE__*/ (function () {
        function ControlPointer() {}
        ControlPointer.onUpdateHandler = function onUpdateHandler(input) {
          ++this._frameIndex
          var pointers = input.pointers
          switch (pointers.length) {
            case 1:
              if (input.isPointerHeldDown(oasis.PointerButton.Secondary)) {
                this._updateType(ControlHandlerType.PAN, DeltaType.Moving)
              } else if (input.isPointerHeldDown(oasis.PointerButton.Auxiliary)) {
                this._updateType(ControlHandlerType.ZOOM, DeltaType.Moving)
              } else if (input.isPointerHeldDown(oasis.PointerButton.Primary)) {
                this._updateType(ControlHandlerType.ROTATE, DeltaType.Moving)
              } else {
                // When `onPointerMove` happens on the same frame as `onPointerUp`
                // Need to record the movement of this frame
                if (input.pointerMovingDelta.x !== 0 && input.pointerMovingDelta.y !== 0) {
                  if (input.isPointerUp(oasis.PointerButton.Secondary)) {
                    this._updateType(ControlHandlerType.PAN, DeltaType.Moving)
                  } else if (input.isPointerUp(oasis.PointerButton.Auxiliary)) {
                    this._updateType(ControlHandlerType.ZOOM, DeltaType.Moving)
                  } else if (input.isPointerUp(oasis.PointerButton.Primary)) {
                    this._updateType(ControlHandlerType.ROTATE, DeltaType.Moving)
                  } else {
                    this._updateType(ControlHandlerType.None, DeltaType.Moving)
                  }
                } else {
                  this._updateType(ControlHandlerType.None, DeltaType.Moving)
                }
              }
              break
            case 2:
              this._updateType(ControlHandlerType.ZOOM, DeltaType.Distance)
              break
            case 3:
              this._updateType(ControlHandlerType.PAN, DeltaType.Moving)
              break
            default:
              this._updateType(ControlHandlerType.None, DeltaType.Moving)
              break
          }
          return this._handlerType
        }
        ControlPointer.onUpdateDelta = function onUpdateDelta(control, outDelta) {
          var frameIndex = this._frameIndex
          switch (this._deltaType) {
            case DeltaType.Moving:
              if (this._lastUsefulFrameIndex === frameIndex - 1) {
                var pointerMovingDelta = control.input.pointerMovingDelta
                outDelta.x = pointerMovingDelta.x
                outDelta.y = pointerMovingDelta.y
              } else {
                outDelta.x = 0
                outDelta.y = 0
              }
              break
            case DeltaType.Distance:
              var pointers = control.input.pointers
              var pointer1 = pointers[0]
              var pointer2 = pointers[1]
              var curDistance = oasis.Vector2.distance(pointer1.position, pointer2.position)
              if (this._lastUsefulFrameIndex === frameIndex - 1) {
                outDelta.set(0, this._distanceOfPointers - curDistance, 0)
              } else {
                outDelta.set(0, 0, 0)
              }
              this._distanceOfPointers = curDistance
              break
          }
          this._lastUsefulFrameIndex = frameIndex
        }
        ControlPointer._updateType = function _updateType(handlerType, deltaType) {
          if (this._handlerType !== handlerType || this._deltaType !== deltaType) {
            this._handlerType = handlerType
            this._deltaType = deltaType
            this._lastUsefulFrameIndex = -1
          }
        }
        return ControlPointer
      })()),
      (_class2._deltaType = DeltaType.Moving),
      (_class2._handlerType = ControlHandlerType.None),
      (_class2._frameIndex = 0),
      (_class2._lastUsefulFrameIndex = -1),
      (_class2._distanceOfPointers = 0),
      _class2))
  ) || _class$1)

var _dec, _class
var ControlWheel =
  ((_dec = StaticInterfaceImplement()),
  _dec(
    (_class = /*#__PURE__*/ (function () {
      function ControlWheel() {}
      ControlWheel.onUpdateHandler = function onUpdateHandler(input) {
        var wheelDelta = input.wheelDelta
        if (wheelDelta.x === 0 && wheelDelta.y === 0 && wheelDelta.z === 0) {
          return ControlHandlerType.None
        } else {
          return ControlHandlerType.ZOOM
        }
      }
      ControlWheel.onUpdateDelta = function onUpdateDelta(control, outDelta) {
        outDelta.copyFrom(control.input.wheelDelta)
      }
      return ControlWheel
    })())
  ) || _class)

/**
 * The camera's track controller, can rotate, zoom, pan, support mouse and touch events.
 */
var OrbitControl = /*#__PURE__*/ (function (_Script) {
  _inheritsLoose(OrbitControl, _Script)
  function OrbitControl() {
    var _this
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }
    _this = _Script.call.apply(_Script, [this].concat(args)) || this
    _this.canvas = void 0
    _this.input = void 0
    _this.inputDevices = [ControlKeyboard, ControlPointer, ControlWheel]
    _this.camera = void 0
    _this.cameraTransform = void 0
    _this.target = new oasis.Vector3()
    _this.up = new oasis.Vector3(0, 1, 0)
    _this.autoRotate = false
    _this.autoRotateSpeed = Math.PI
    _this.enableDamping = true
    _this.rotateSpeed = 1.0
    _this.zoomSpeed = 1.0
    _this.keyPanSpeed = 7.0
    _this.dampingFactor = 0.1
    _this.zoomFactor = 0.2
    _this.minDistance = 0.1
    _this.maxDistance = Infinity
    _this.minZoom = 0.0
    _this.maxZoom = Infinity
    _this.minPolarAngle = 0.0
    _this.maxPolarAngle = Math.PI
    _this.minAzimuthAngle = -Infinity
    _this.maxAzimuthAngle = Infinity
    _this._enableKeys = true
    _this._spherical = new Spherical()
    _this._sphericalDelta = new Spherical()
    _this._sphericalDump = new Spherical()
    _this._zoomFrag = 0
    _this._scale = 1
    _this._panOffset = new oasis.Vector3()
    _this._tempVec3 = new oasis.Vector3()
    _this._enableHandler = ControlHandlerType.All
    return _this
  }
  var _proto = OrbitControl.prototype
  _proto.onAwake = function onAwake() {
    var engine = this.engine,
      entity = this.entity
    this.canvas = engine.canvas
    this.input = engine.inputManager
    this.camera = entity.getComponent(oasis.Camera)
    this.cameraTransform = entity.transform
  }
  _proto.onUpdate = function onUpdate(deltaTime) {
    /** Update this._sphericalDelta, this._scale and this._panOffset. */
    this._updateInputDelta(deltaTime)
    /** Update camera's transform. */
    this._updateTransform()
  }
  _proto._updateInputDelta = function _updateInputDelta(deltaTime) {
    var curHandlerType = ControlHandlerType.None
    var delta = this._tempVec3,
      enableHandler = this._enableHandler
    var inputDevices = this.inputDevices,
      input = this.input
    for (var i = inputDevices.length - 1; i >= 0; i--) {
      var handler = inputDevices[i]
      var handlerType = handler.onUpdateHandler(input)
      if (handlerType & enableHandler) {
        curHandlerType |= handlerType
        handler.onUpdateDelta(this, delta)
        switch (handlerType) {
          case ControlHandlerType.ROTATE:
            this._rotate(delta)
            break
          case ControlHandlerType.ZOOM:
            this._zoom(delta)
            break
          case ControlHandlerType.PAN:
            this._pan(delta)
            break
        }
      }
    }
    var _sphericalDump = this._sphericalDump,
      _sphericalDelta = this._sphericalDelta
    if (this.enableDamping) {
      if (enableHandler & ControlHandlerType.ZOOM && curHandlerType ^ ControlHandlerType.ZOOM) {
        this._zoomFrag *= 1 - this.zoomFactor
      }
      if (enableHandler & ControlHandlerType.ROTATE && curHandlerType ^ ControlHandlerType.ROTATE) {
        _sphericalDelta.theta = _sphericalDump.theta *= 1 - this.dampingFactor
        _sphericalDelta.phi = _sphericalDump.phi *= 1 - this.dampingFactor
      }
    }
    if (curHandlerType === ControlHandlerType.None && this.autoRotate) {
      var rotateAngle = (this.autoRotateSpeed / 1000) * deltaTime
      _sphericalDelta.theta -= rotateAngle
    }
  }
  _proto._rotate = function _rotate(delta) {
    var radianLeft = ((2 * Math.PI * delta.x) / this.canvas.width) * this.rotateSpeed
    this._sphericalDelta.theta -= radianLeft
    var radianUp = ((2 * Math.PI * delta.y) / this.canvas.height) * this.rotateSpeed
    this._sphericalDelta.phi -= radianUp
    if (this.enableDamping) {
      this._sphericalDump.theta = -radianLeft
      this._sphericalDump.phi = -radianUp
    }
  }
  _proto._zoom = function _zoom(delta) {
    if (delta.y > 0) {
      this._scale /= Math.pow(0.95, this.zoomSpeed)
    } else if (delta.y < 0) {
      this._scale *= Math.pow(0.95, this.zoomSpeed)
    }
  }
  _proto._pan = function _pan(delta) {
    var cameraTransform = this.cameraTransform
    var elements = cameraTransform.worldMatrix.elements
    var height = this.canvas.height
    var targetDistance =
      oasis.Vector3.distance(cameraTransform.position, this.target) *
      (this.camera.fieldOfView / 2) *
      (Math.PI / 180)
    var distanceLeft = -2 * delta.x * (targetDistance / height)
    var distanceUp = 2 * delta.y * (targetDistance / height)
    this._panOffset.x += elements[0] * distanceLeft + elements[4] * distanceUp
    this._panOffset.y += elements[1] * distanceLeft + elements[5] * distanceUp
    this._panOffset.z += elements[2] * distanceLeft + elements[6] * distanceUp
  }
  _proto._updateTransform = function _updateTransform() {
    var cameraTransform = this.cameraTransform,
      target = this.target,
      _tempVec3 = this._tempVec3,
      _spherical = this._spherical,
      _sphericalDelta = this._sphericalDelta,
      _panOffset = this._panOffset
    oasis.Vector3.subtract(cameraTransform.position, target, _tempVec3)
    _spherical.setFromVec3(_tempVec3)
    _spherical.theta += _sphericalDelta.theta
    _spherical.phi += _sphericalDelta.phi
    _spherical.theta = Math.max(
      this.minAzimuthAngle,
      Math.min(this.maxAzimuthAngle, _spherical.theta)
    )
    _spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, _spherical.phi))
    _spherical.makeSafe()
    if (this._scale !== 1) {
      this._zoomFrag = _spherical.radius * (this._scale - 1)
    }
    _spherical.radius += this._zoomFrag
    _spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, _spherical.radius))
    _spherical.setToVec3(_tempVec3)
    oasis.Vector3.add(target.add(_panOffset), _tempVec3, cameraTransform.position)
    cameraTransform.lookAt(target, this.up)
    /** Reset cache value. */
    this._zoomFrag = 0
    this._scale = 1
    _sphericalDelta.set(0, 0, 0)
    _panOffset.set(0, 0, 0)
  }
  _createClass(OrbitControl, [
    {
      key: 'enableKeys',
      get:
        /**
         * Return whether to enable keyboard.
         */
        function get() {
          return this._enableKeys
        },
      set: function set(value) {
        if (this._enableKeys !== value) {
          this._enableKeys = value
          var inputDevices = this.inputDevices
          if (value) {
            inputDevices.push(ControlKeyboard)
          } else {
            for (var i = inputDevices.length - 1; i >= 0; i--) {
              if (inputDevices[i] === ControlKeyboard) {
                inputDevices.splice(i, 1)
                break
              }
            }
          }
        }
      }

      /**
       *  Return Whether to enable rotation, the default is true.
       */
    },
    {
      key: 'enableRotate',
      get: function get() {
        return (this._enableHandler & ControlHandlerType.ROTATE) !== 0
      },
      set: function set(value) {
        if (value) {
          this._enableHandler |= ControlHandlerType.ROTATE
        } else {
          this._enableHandler &= ~ControlHandlerType.ROTATE
        }
      }

      /**
       *  Whether to enable camera damping, the default is true.
       */
    },
    {
      key: 'enableZoom',
      get: function get() {
        return (this._enableHandler & ControlHandlerType.ZOOM) !== 0
      },
      set: function set(value) {
        if (value) {
          this._enableHandler |= ControlHandlerType.ZOOM
        } else {
          this._enableHandler &= ~ControlHandlerType.ZOOM
        }
      }

      /**
       *  Whether to enable translation, the default is true.
       */
    },
    {
      key: 'enablePan',
      get: function get() {
        return (this._enableHandler & ControlHandlerType.PAN) !== 0
      },
      set: function set(value) {
        if (value) {
          this._enableHandler |= ControlHandlerType.PAN
        } else {
          this._enableHandler &= ~ControlHandlerType.PAN
        }
      }
    }
  ])
  return OrbitControl
})(oasis.Script)

function _optionalChain(ops) {
  let lastAccessLHS = undefined
  let value = ops[0]
  let i = 1
  while (i < ops.length) {
    const op = ops[i]
    const fn = ops[i + 1]
    i += 2
    if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
      return undefined
    }
    if (op === 'access' || op === 'optionalAccess') {
      lastAccessLHS = value
      value = fn(value)
    } else if (op === 'call' || op === 'optionalCall') {
      value = fn((...args) => value.call(lastAccessLHS, ...args))
      lastAccessLHS = undefined
    }
  }
  return value
}
</script>

<style lang="scss" scoped>
.webgl-box {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  .webgl {
    display: block;
    width: 100%;
    height: 100%;
    z-index: 9;
  }
  .loading-box {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loading {
    width: 74rpx;
    height: 74rpx;
    font-size: 0;
    color: transparent;
    overflow: hidden;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &-item {
      flex-shrink: 0;
      margin: 4rpx;
      width: 16rpx;
      height: 16rpx;
      border-radius: 16rpx;
      background-color: #fff;
      animation-name: ball-grid-pulse;
      animation-iteration-count: infinite;
    }
    &-item-0 {
      animation-duration: 0.65s;
      animation-delay: 0.03s;
    }
    &-item-1 {
      animation-duration: 1.02s;
      animation-delay: 0.09s;
    }
    &-item-2 {
      animation-duration: 1.06s;
      animation-delay: -0.69s;
    }
    &-item-3 {
      animation-duration: 1.5s;
      animation-delay: -0.41s;
    }
    &-item-4 {
      animation-duration: 1.6s;
      animation-delay: 0.04s;
    }
    &-item-5 {
      animation-duration: 0.84s;
      animation-delay: 0.07s;
    }
    &-item-6 {
      animation-duration: 0.68s;
      animation-delay: -0.66s;
    }
    &-item-7 {
      animation-duration: 0.93s;
      animation-delay: -0.76s;
    }
    &-item-8 {
      animation-duration: 1.24s;
      animation-delay: -0.76s;
    }
  }
}
@keyframes ball-grid-pulse {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.35;
    transform: scale(0.45);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
