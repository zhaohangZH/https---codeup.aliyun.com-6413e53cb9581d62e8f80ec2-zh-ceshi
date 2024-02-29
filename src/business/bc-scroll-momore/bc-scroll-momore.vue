<template>
  <view class="bc-scroll-momore">
    <view class="bc-scroll-momore-ce"></view>
    <view class="bc-scroll-momore-text">没有更多了 o(╥﹏╥)o</view>
    <view class="bc-scroll-momore-ce"></view>
  </view>
</template>
<style lang="scss" scoped>
.bc-scroll-momore {
  margin-top: 30rpx;
  height: 80rpx;
  font-size: 27rpx;
  clear: both;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &-ce {
    height: 1px;
    width: 100rpx;
    margin: 0rpx 10rpx;
  }
  &-text {
    color: #a4a4a4;
  }
}
</style>
