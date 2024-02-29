<template>
  <view
    v-if="placeholder"
    class="tc-tabbar__placeholder"
    :style="{ height: placeholderHeight + 'px' }"
  ></view>
  <view
    data-eventsync="true"
    class="tc-tabbar__content"
    :class="[jsSelector, { 'tc-tabbar__border__top': border, 'tc-tabbar--fixed': fixed }]"
    :style="[{ 'z-index': zIndex }, customStyle]"
    @touchmove.stop.prevent="() => {}"
  >
    <view class="tc-tabbar__content__item-wrapper">
      <slot />
    </view>
    <view v-if="safeAreaInsetBottom" :style="{ height: safeAreaBottom + 'px' }"></view>
  </view>
</template>
<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue'
import { guid } from '@/utils/common.js'
const jsSelector = guid()

// 当前组件实例
let vm = null

const emits = defineEmits(['init'])
const props = defineProps({
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  border: {
    type: Boolean,
    default: true
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

const placeholderHeight = ref(0)
const setPlaceholderHeight = () => {
  uni
    .createSelectorQuery()
    .in(vm)
    .select('.' + jsSelector)
    .boundingClientRect(({ height = 50 }) => {
      placeholderHeight.value = height
      emits('init', { height })
    })
    .exec()
}

const safeAreaBottom = ref(0)
onMounted(() => {
  if (props.safeAreaInsetBottom) {
    safeAreaBottom.value = uni.getSystemInfoSync().safeAreaInsets.bottom
  }
  vm = getCurrentInstance()
  setTimeout(setPlaceholderHeight, 20)
})
</script>
<style lang="scss" scoped>
.tc-tabbar {
  &__border__top {
    box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0, 0, 0, 0.1);
  }

  &__content {
    background-color: rgba(255, 255, 255, 1);
    // transition: background-color 50ms linear;
    &__item-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  &--fixed {
    position: fixed;
    bottom: 0;
    /* #ifdef H5 */
    left: var(--window-left);
    right: var(--window-right);
    /* #endif */
    /* #ifndef H5 */
    left: 0;
    right: 0;
    /* #endif */
  }

  &__safe__bottom {
    padding-bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
