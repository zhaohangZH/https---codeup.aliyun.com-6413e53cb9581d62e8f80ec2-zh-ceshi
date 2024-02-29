<template>
  <image
    class="tc-image"
    :src="url"
    :mode="mode"
    :show-menu-by-longpress="showMenuByLongpress"
    :lazy-load="lazyLoad"
    :style="imgStyle"
    @error="onErrorHandler"
  ></image>
</template>

<!-- #ifdef MP-WEIXIN -->
<script>
export default {
  options: {
    virtualHost: true
  }
}
</script>
<!-- #endif -->

<script setup>
import { ref, computed, watch } from 'vue'
import { addUnit } from '@/utils/common.js'
import { isUrl } from '@/utils/regex.js'
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  mode: {
    type: String,
    default: 'aspectFit'
  },
  showMenuByLongpress: {
    type: Boolean,
    default: false
  },
  lazyLoad: {
    type: Boolean,
    default: false
  },
  shape: {
    type: String,
    default: 'square'
  },
  radius: {
    type: [String, Number],
    default: addUnit(0)
  },
  width: {
    type: [String, Number],
    default: addUnit(300, 'px')
  },
  height: {
    type: [String, Number],
    default: 'auto'
  }
})
const imgPath = ref('')
watch(
  () => props.src,
  (v) => {
    imgPath.value = v
  },
  {
    immediate: true
  }
)
const url = computed(() => {
  let result = ''
  const resHost = import.meta.env.VITE_VUE_APP_RESOURCE_BASEURL
  const staHost = import.meta.env.VITE_VUE_APP_STATIC_BASEURL
  const path = imgPath.value
  if (!path) {
    result = staHost + 'error.png'
  } else if (/^\!\@\//.test(path)) {
    result = path.replace(/^\!\@\//, staHost)
  } else if (isUrl(path)) {
    result = path
  } else if (/^\//.test(path)) {
    result = resHost + path
  } else {
    result = resHost + '/' + path
  }
  return result
})
const imgStyle = computed(() => {
  let imgCss = {
    borderRadius: props.shape == 'circle' ? '10000px' : addUnit(props.radius)
  }
  if (props.width && props.width !== 'auto') {
    imgCss.width = addUnit(props.width)
  }
  if (props.height && props.height !== 'auto') {
    imgCss.height = addUnit(props.height)
  }
  return imgCss
})
const onErrorHandler = () => (imgPath.value = '')
</script>
<style lang="scss" scoped>
/* #ifndef APP-NVUE */
.tc-image {
  display: block;
  // max-width: 100%;
}
/*  #endif */
</style>
