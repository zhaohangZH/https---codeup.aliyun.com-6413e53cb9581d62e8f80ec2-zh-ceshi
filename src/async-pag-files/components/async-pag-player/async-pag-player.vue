<template>
  <canvas class="js-pag-el" type="webgl" style="display: block; width: 100%; height: 100%"></canvas>
</template>
<script setup>
import { watch, onMounted, onUnmounted, getCurrentInstance } from 'vue'

const {
  PAGInit
} = require(/* npm版本(libpag-miniprogram: 4.2.59) */ '../../static/libpag/index.js')

const props = defineProps({
  src: {
    type: String,
    default: () => ''
  }
})
let pag = null
let pagCanvas = null
let pagView = null
const instance = getCurrentInstance()
onMounted(async () => {
  pag = await PAGInit({ locateFile: (file) => '/static/' + file })
  pagPlay()
})
const pagPlay = async () => {
  if (pagView) pagView.destroy()
  const buffer = await loadFileByRequest()
  if (buffer) {
    const pagFile = await pag.PAGFile.load(buffer)
    if (pagFile) {
      pagCanvas = await new Promise((resolve) => {
        uni
          .createSelectorQuery()
          .in(instance)
          .select('.js-pag-el')
          .node()
          .exec(async (res) => {
            resolve(res[0].node)
          })
      })
      pagView = await pag.PAGView.init(pagFile, pagCanvas)
      pagView.setRepeatCount(0)
      pagView.play()
    }
  }
}
const loadFileByRequest = () => {
  return new Promise((resolve) => {
    if (props.src) {
      uni.request({
        url: props.src,
        method: 'GET',
        responseType: 'arraybuffer',
        success(res) {
          if (res.statusCode !== 200) {
            resolve(null)
          }
          resolve(res.data)
        },
        fail() {
          resolve(null)
        }
      })
    } else {
      resolve(null)
    }
  })
}
watch(
  () => props.src,
  (v) => {
    if (v && pag) {
      pagPlay()
    }
  }
)
onUnmounted(() => {})
</script>
<style lang="scss" scoped>
.load-pag {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
