<template>
  <view
    v-if="placeholder"
    class="tc-navbar__placeholder"
    :style="{ height: placeholderHeight + 'px' }"
  ></view>
  <view
    data-eventsync="true"
    class="jsSelector tc-navbar"
    :class="[{ 'tc-navbar__border__bottom': border, 'tc-navbar--fixed': fixed }]"
    :style="[{ 'z-index': zIndex }, customStyle]"
    @touchmove.stop.prevent="() => {}"
  >
    <!-- 手机状态栏占位 -->
    <view :style="[statusBarStyle]" class="tc-navbar__status-bar"></view>
    <!-- 自定义导航栏 -->
    <view :style="[navbarStyle]" class="tc-navbar__content">
      <slot />
    </view>
  </view>
</template>
<script setup>
import { ref, computed, onMounted, getCurrentInstance } from 'vue'

// 当前组件实例
let vm = null
const systemInfo = uni.getSystemInfoSync()
// #ifdef MP
const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
// #endif

const emits = defineEmits(['init'])
const props = defineProps({
  border: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: [String, Number],
    default: 998
  },
  placeholder: {
    type: Boolean,
    default: true
  },
  fixed: {
    type: Boolean,
    default: true
  },
  customStyle: {
    type: Object,
    default: () => ({})
  }
})
const statusBarStyle = computed(() => ({ height: systemInfo.statusBarHeight + 'px' }))
const navbarStyle = computed(() => {
  let height = systemInfo.platform == 'ios' ? 44 : 48
  let spac = 8
  // #ifdef MP
  const menuHeight = menuButtonInfo.height + (menuButtonInfo.top - systemInfo.statusBarHeight) * 2
  height = menuHeight > 0 ? menuHeight : height
  spac = systemInfo.windowWidth - menuButtonInfo.right
  // #endif
  return {
    height: height + 'px',
    lineHeight: height + 'px',
    marginLeft: spac + 'px',
    marginRight: spac + 'px',
    // #ifdef MP
    marginRight: 2 * spac + menuButtonInfo.width + 'px'
    // #endif
  }
})

const placeholderHeight = ref(0)
const setPlaceholderHeight = () => {
  uni
    .createSelectorQuery()
    .in(vm)
    .select('.jsSelector')
    .boundingClientRect(({ height = 64 }) => {
      placeholderHeight.value = height
      emits('init', {
        height,
        indent: 0,
        // #ifdef MP
        indent: menuButtonInfo.width
        // #endif
      })
    })
    .exec()
}

onMounted(() => {
  vm = getCurrentInstance()
  setTimeout(setPlaceholderHeight, 20)
})
</script>
<style lang="scss" scoped>
.tc-navbar {
  background-color: rgba(255, 255, 255, 0);
  // transition: background-color 50ms linear;
  &__border__bottom {
    box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0, 0, 0, 0.1);
  }
  &__content {
    display: flex;
    align-items: center;
  }
  &--fixed {
    position: fixed;
    top: 0;
    /* #ifdef H5 */
    left: var(--window-left);
    right: var(--window-right);
    /* #endif */
    /* #ifndef H5 */
    left: 0;
    right: 0;
    /* #endif */
  }
}
</style>
