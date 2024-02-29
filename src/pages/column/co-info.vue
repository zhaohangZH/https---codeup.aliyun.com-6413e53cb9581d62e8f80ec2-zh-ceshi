<template>
  <view v-if="info" class="colum_info_box">
    <view class="colum_info flex-row">
      <view class="colum_info_img">
        <tc-image width="104rpx" height="104rpx" radius="28rpx" :src="info.iconUrl" />
      </view>
      <view class="colum_info_main">
        <view>{{ info.name }}</view>
        <text>{{ info.title }}</text>
      </view>
    </view>
    <view class="colum_info_text">
      <mp-html :content="info.description" />
    </view>
  </view>
</template>
<script setup>
const props = defineProps({
  info: {
    type: Object,
    define: () => {}
  }
})
</script>
<style lang="scss" scoped>
.colum_info_box {
  padding: 40rpx 0 130rpx;
  // height: 360rpx;
  background: #f6f6f6;
}
.colum_info {
  margin: 0 32rpx;
  &_img {
    width: 104rpx;
    height: 104rpx;
    border: 2rpx solid #efefef;
    border-radius: 28rpx;
  }
  &_main {
    margin-left: 28rpx;
    view {
      line-height: 60rpx;
      font-size: 40rpx;
      font-weight: bold;
    }
    text {
      line-height: 42rpx;
      font-size: 22rpx;
      color: #aaaaaa;
    }
  }
  &_text {
    margin: 28rpx 32rpx 0;
    padding: 20rpx 32rpx;
    line-height: 36rpx;
    font-size: 22rpx;
    color: #666;
    border-radius: 28rpx;
    background: #ededed;
  }
}
</style>
