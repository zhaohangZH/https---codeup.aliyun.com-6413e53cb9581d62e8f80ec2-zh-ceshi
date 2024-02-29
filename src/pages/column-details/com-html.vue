<template>
  <view class="column-details-html">
    <view v-if="type == 2" class="column-details-html_title flex-row justify-between">
      <view class="column-details-html_title_left flex-row items-center"
        ><tc-image width="28" height="28" src="!@/column/icon_02.png" /><text>参赛流程</text></view
      >
      <view class="column-details-html_title_right flex-row items-center">{{ title }}</view>
    </view>
    <view v-if="type == 3" class="column-details-html_title flex-row justify-between">
      <view class="column-details-html_title_left flex-row items-center"
        ><tc-image width="28" height="28" src="!@/column/icon_03.png" /><text>奖项设置</text></view
      >
      <view class="column-details-html_title_right flex-row items-center">{{ title }}</view>
    </view>
    <view v-if="type == 1" class="column-details-html_title flex-row justify-between">
      <view class="column-details-html_title_left flex-row items-center"
        ><tc-image width="28" height="28" :src="'!@/column/' + icon + '.png'" /><text>{{
          name
        }}</text></view
      >
    </view>
    <mp-html :content="info" space="nbsp" :preview-img="false" />
  </view>
</template>
<script setup>
defineProps({
  name: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  info: {
    type: String,
    default: ''
  },
  type: {
    type: Number,
    default: 0
  }
})
</script>
<style lang="scss" scoped>
.column-details-html {
  margin: 24rpx;
  padding: 32rpx 40rpx;
  color: #333;
  background-color: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.06);
  &_title {
    padding: 0 0 32rpx;
    border-bottom: 2rpx solid #f6f6f6;
    &_left {
      font-size: 28rpx;
      text {
        margin: 0 16rpx;
        font-weight: bold;
      }
    }
    &_right {
      font-size: 20rpx;
      color: #3567cb;
    }
  }
}
</style>
