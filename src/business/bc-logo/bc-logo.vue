<template>
  <view class="jsSelector tc-logo-box" :style="[setColor]">
    <view class="tc-logo-icon">
      <view class="logo-icon icon-logo-icon-1"></view>
      <view class="tc-logo-icon-float logo-icon icon-logo-icon-2"></view>
    </view>
    <view class="tc-logo-text logo-icon icon-logo-text-1"></view>
  </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: () => '#fff'
  }
})
const setColor = computed(() => ({
  '--logo-icon-color': props.color,
  '--logo-text-color': props.color
}))
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'logo-icon';
  src: url('./logo.ttf') format('truetype');
}
.logo-icon {
  font-family: 'logo-icon' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-logo-icon-2:before {
  content: '\e601';
}

.icon-logo-icon-1:before {
  content: '\e602';
}

.icon-logo-text-1:before {
  content: '\e603';
}
.tc-logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tc-logo-icon {
  font-size: 26px;
  line-height: 26px;
  color: var(--logo-icon-color);
  position: relative;
  &-float {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: rotateY360 10s infinite ease-in-out;
  }
}
.tc-logo-text {
  margin-left: 6px;
  font-size: 22px;
  line-height: 26px;
  color: var(--logo-text-color);
}
@keyframes rotateY360 {
  0% {
    transform: rotateY(0deg);
  }
  40% {
    transform: rotateY(0deg);
  }
  48% {
    transform: rotateY(360deg);
  }
  52% {
    transform: rotateY(360deg);
  }
  60% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
</style>
