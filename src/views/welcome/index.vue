<template>
  <bc-navbar :type="1" :share="false" :placeholder="false">
    <template #img><bc-logo color="#004E97" /></template>
  </bc-navbar>
  <view class="welcome">
    <tc-booth
      :cover-image="coverImage"
      :default-style="{
        width: '300rpx',
        height: '300rpx'
      }"
      @load="handleBoothLoad"
    />
    <cover-view :style="{ opacity: isLoaded ? 0 : 1 }" class="cover-box"></cover-view>
  </view>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue'
const MAX_TIME = 3500
const HOME_URL = 'views/home/index'
const coverImage = import.meta.env.VITE_VUE_APP_STATIC_BASEURL + 'Logo_an.mp4'
const isLoaded = ref(false)
let timer = 0
const handleBoothLoad = (v) => {
  isLoaded.value = true
  clearTimeout(timer)
  uni.preloadWebview()
  timer = setTimeout(() => {
    uni.switchTab({ url: HOME_URL })
  }, MAX_TIME)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped lang="scss">
.welcome {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  position: relative;
}
.cover-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  opacity: 1;
  background-color: #fff;
  transition: opacity 0.16s ease-in-out;
}
</style>
