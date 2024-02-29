<template>
  <view class="com-bd">
    <swiper class="com-bd-swiper" autoplay circular>
      <swiper-item v-for="item in info" :key="item">
        <view style="display: flex; width: 100%; height: 100%">
          <tc-image width="100%" height="100%" :src="item" />
        </view>
      </swiper-item>
    </swiper>
    <!-- <view class="com-bd-tip">
      <tc-image width="28" height="28" src="!@/icons/i16.png" />
      <text class="com-bd-tip-t1">{{ count }}</text>
      <text class="com-bd-tip-t2">人已完成捐赠</text>
    </view> -->
  </view>
</template>
<script setup>
defineProps({
  info: {
    type: Array,
    default: () => []
  },
  count: {
    type: [Number, String],
    default: 0
  }
})
</script>
<style lang="scss" scoped>
.com-bd {
  position: relative;
  &-swiper {
    width: 750rpx;
    height: 680rpx;
  }
  &-tip {
    height: 80rpx;
    padding: 0 32rpx;
    background-color: rgba(0, 0, 0, 0.2);

    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;

    display: flex;
    align-items: center;

    &-t1 {
      margin: 0 6rpx 0 16rpx;
      font-size: 30rpx;
      font-weight: 500;
      color: #ffffff;
    }
    &-t2 {
      font-size: 24rpx;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
</style>
