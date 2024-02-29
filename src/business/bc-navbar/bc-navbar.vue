<template>
  <tc-navbar
    class="jsNavbarInstance"
    :custom-style="customStyle"
    :placeholder="placeholder"
    @init="(v) => emits('init', v)"
  >
    <view class="navbar">
      <!-- 显示 logo -->
      <view v-if="type === 1" style="margin-left: 12px; display: flex; align-items: center">
        <!-- <tc-image v-if="img" width="178px" height="24px" :src="img" /> -->
        <slot name="img"></slot>
      </view>

      <!-- 显示 返回/主页胶囊 -->
      <template v-else-if="type === 2">
        <view class="capsule">
          <view class="capsule-item" @click="goBack">
            <text class="tc-icon" style="font-size: 22px; color: #666">&#xe61d</text>
          </view>
          <view class="capsule-line"></view>
          <view class="capsule-item" @click="goHome">
            <text class="tc-icon" style="font-size: 25px; color: #666">&#xe669</text>
          </view>
        </view>
      </template>

      <!-- 显示 返回首页胶囊 -->
      <template v-else-if="type === 3">
        <view class="capsule" @click="goHome">
          <view class="capsule-item" style="width: 30px">
            <text class="tc-icon" style="font-size: 25px; color: #666">&#xe669</text>
          </view>
        </view>
      </template>

      <!-- 显示 返回按钮 + 标题 -->
      <template v-else-if="type === 4">
        <view class="title">
          <view class="title-icon" @click="goBack">
            <text class="tc-icon" style="font-size: 27px; color: #666">&#xe61d</text>
          </view>
          <view class="title-text">
            <text class="tc-line-1">{{ title }}</text>
          </view>
        </view>
      </template>

      <!-- #ifdef MP-WEIXIN -->
      <!-- 自定义分享按钮 -->
      <view v-if="share" class="capsule">
        <button class="button-share" open-type="share">
          <text class="tc-icon" style="font-size: 23px; color: #000">&#xe60c</text>
        </button>
      </view>
      <!-- #endif -->
    </view>
  </tc-navbar>
</template>
<script setup>
// import { debounce } from '@/utils/debounce.js'
const emits = defineEmits(['init'])
defineProps({
  type: {
    type: [Number, String],
    default: 0
  },
  img: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  share: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: Boolean,
    default: true
  },
  customStyle: {
    type: Object,
    default: () => ({})
  }
})
const goBack = () => uni.navigateBack({ delta: 1 })
const goHome = () => uni.switchTab({ url: 'views/home/index' })
</script>
<style lang="scss" scoped>
@import './icon-font.scss';
.navbar {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.capsule {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(#aaaaaa, 0.2);
  border-radius: 32px;
  background-color: #fff;
  &-item {
    width: 42px;
    height: 30px;
    line-height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  &-line {
    width: 1px;
    height: 16px;
    background-color: #aaaaaa;
    opacity: 0.6;
  }
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;

  &-icon {
    height: 38px;
    padding-right: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &-text {
    font-family: TsangerYuMo-3;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 17px;
    font-weight: 400;
    color: #000000;
  }
}

.button-share {
  width: 30px;
  height: 30px;
  line-height: 30px;
  border: 0 solid transparent;
  outline: none;
  box-shadow: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  &::after {
    display: none;
  }
}
</style>
