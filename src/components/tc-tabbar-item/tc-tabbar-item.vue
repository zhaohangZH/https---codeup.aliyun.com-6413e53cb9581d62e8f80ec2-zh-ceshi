<template>
  <view class="tc-tabbar-item" @click="emits('item-click', pagePath)">
    <tc-image width="18px" height="18px" :src="imageSrc" mode="wigthFix" />
    <text class="tc-tabbar-item__text" :style="[textColor]">
      {{ text }}
    </text>
  </view>
</template>
<script setup>
import { computed } from 'vue'
const emits = defineEmits(['item-change', 'item-click'])
const props = defineProps({
  pagePath: {
    type: [String, Number],
    default: ''
  },
  text: {
    type: String,
    default: ''
  },

  iconPath: {
    type: String,
    default: ''
  },
  selectedIconPath: {
    type: String,
    default: ''
  },
  hoverIconPath: {
    type: String,
    default: ''
  },

  color: {
    type: String,
    default: '#999'
  },
  selectedColor: {
    type: String,
    default: '#1A377F'
  },
  hoverColor: {
    type: String,
    default: '#FFF'
  },

  dot: {
    type: Boolean,
    default: false
  },
  badge: {
    type: [String, null],
    default: null
  },
  badgeStyle: {
    type: [String, Object],
    default: 'top: 6px;right:2px;'
  },

  isActive: {
    type: Boolean,
    default: false
  },
  isHover: {
    type: Boolean,
    default: false
  }
})
const imageSrc = computed(() => {
  let url = ''
  if (props.isHover) {
    url = props.hoverIconPath
  } else if (props.isActive) {
    url = props.selectedIconPath
  } else {
    url = props.iconPath
  }
  return url
})
const textColor = computed(() => {
  let style = {}
  if (props.isHover) {
    style = { color: props.hoverColor }
  } else if (props.isActive) {
    style = { color: props.selectedColor }
  } else {
    style = { color: props.color }
  }
  return style
})
</script>
<style lang="scss" scoped>
.tc-tabbar-item {
  height: 62px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__text {
    margin-top: 6px;
    font-size: 10px;
    font-weight: 400;
  }
}
</style>
