<template>
  <view class="column-details-info">
    <view class="column-details-info_title">{{ info.name }}</view>
    <view class="column-details-info_content flex-row">
      <view class="column-details-info_content_left">报名时间：</view>
      <view v-if="info.signStartTime" class="column-details-info_content_right"
        >{{ info.signStartTime.split(' ')[0] }} - {{ info.signEndTime.split(' ')[0] }}</view
      >
    </view>
    <view class="column-details-info_content flex-row">
      <view class="column-details-info_content_left">主办单位：</view>
      <view class="column-details-info_content_right">{{ info.organizerCompanyName }}</view>
    </view>
    <view class="column-details-info_content flex-row">
      <view class="column-details-info_content_left">承办单位：</view>
      <view class="column-details-info_content_right">{{ info.undertakeCompanyNames }}</view>
    </view>
  </view>
</template>
<script setup>
defineProps({
  info: {
    type: String,
    default: ''
  }
})
</script>
<style lang="scss" scoped>
.column-details-info {
  margin: 24rpx;
  padding: 32rpx 40rpx;
  color: #333;
  background-color: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.06);
  &_title {
    margin-bottom: 14rpx;
    padding-bottom: 36rpx;
    line-height: 48rpx;
    font-size: 32rpx;
    border-bottom: 2rpx solid #f6f6f6;
  }
  &_content {
    padding: 10rpx 0;
    line-height: 48rpx;
    font-size: 24rpx;
    &_left {
      width: 160rpx;
      color: #999999;
    }
    &_right {
      flex: 1;
    }
  }
}
</style>
