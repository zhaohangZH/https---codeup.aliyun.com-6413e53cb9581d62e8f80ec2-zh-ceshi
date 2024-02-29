<template>
  <view :style="[boxStyle]">
    <!-- 图片 -->
    <tc-image
      v-if="boothType === 1"
      width="100%"
      height="100%"
      :show-menu-by-longpress="showMenuByLongpress"
      :src="coverImage"
      :mode="mode"
      @load="(v) => emits('load', v)"
    />

    <!-- 视频 -->
    <video
      v-else-if="boothType === 2"
      autoplay
      loop
      :controls="false"
      :src="coverImage"
      style="width: 100%; height: 100%; opacity: 0"
      :style="{ opacity: videoLoad ? 1 : 0 }"
      @loadedmetadata="() => emits('load', true)"
      @play="() => (videoLoad = true)"
    />

    <!-- 动画 -->
    <tc-pag-player
      v-else-if="boothType === 3"
      :cover-image="coverImage"
      style="width: 100%; height: 100%"
      @load="(v) => emits('load', v)"
    />

    <!-- 3D模型 -->
    <tc-gltf-player
      v-else-if="boothType === 4"
      :cover-image="coverImage"
      style="width: 100%; height: 100%"
      @load="(v) => emits('load', v)"
    />
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { isImage, isVideo, isGlb, isPag } from '@/utils/regex'
const emits = defineEmits(['load'])
const props = defineProps({
  coverImage: {
    type: String,
    default: ''
  },
  mode: {
    type: String,
    default: 'aspectFit'
  },
  // 通用样式
  defaultStyle: {
    type: Object,
    default: () => {}
  },
  // 图片专属样式
  showMenuByLongpress: {
    type: Boolean,
    default: false
  },
  imageStyle: {
    type: Object,
    default: () => {}
  },
  // 视频专属样式
  videoStyle: {
    type: Object,
    default: () => {}
  },
  // 动画专属样式
  pagStyle: {
    type: Object,
    default: () => {}
  },
  // glb模型专属样式
  gltfStyle: {
    type: Object,
    default: () => {}
  }
})
const videoLoad = ref(false)
const boothType = computed(() => {
  let type = 0
  const coverImage = props.coverImage || ''
  if (isImage(coverImage)) {
    // 图片
    type = 1
  } else if (isVideo(coverImage)) {
    // 视频
    type = 2
  } else if (isPag(coverImage)) {
    // 动画
    type = 3
  } else if (isGlb(coverImage)) {
    // 3D模型
    type = 4
  }
  return type
})
const boxStyle = computed(() => {
  let style = { ...props.defaultStyle }
  switch (boothType.value) {
    case 1:
      style = { ...style, ...props.imageStyle }
      break

    case 2:
      style = { ...style, ...props.videoStyle }
      break

    case 3:
      style = { ...style, ...props.pagStyle }
      break

    case 4:
      style = { ...style, ...props.gltfStyle }
      break
  }
  return { width: '100%', height: '100%', ...style }
})
</script>

<script>
export default {
  options: {
    virtualHost: true
  }
}
</script>

<style scoped lang="scss"></style>
