<template>
  <view class="card-style">
    <view class="card-item">
      <view class="card-item-t1">
        <view class="tc-line-1" style="font-family: DINPro, DINPro-Medium">
          {{ info.startTime }} ~ {{ info.endTime }}
        </view>
      </view>
      <view class="card-item-t2">
        <view class="tc-line-2">{{ info.timeDescription }}</view>
      </view>
    </view>
    <view class="card-line"></view>
    <view class="card-item flex-row" hover-class="hover-class" @click="showLocation">
      <view style="flex: 1">
        <view class="card-item-t1">
          <view class="tc-line-1">{{ info.address }}</view>
        </view>
        <view class="card-item-t3">
          <view class="tc-line-1">{{ info.mapAddress }}</view>
        </view>
      </view>
      <view style="margin-left: 20rpx; flex-shrink: 0">
        <tc-image width="48" height="48" src="!@/images/map-icon.png" />
      </view>
    </view>

    <!-- !@/images/iocas.png -->
    <view class="card-item-rect">
      <text class="card-item-t4">活动举办单位</text>
      <tc-image width="240" height="44" :src="info.executorLogoUrl" />
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  info: {
    type: Object,
    default: () => {}
  }
})

const showLocation = () => {
  const { latitude, longitude, address, mapAddress: name } = props.info
  if (!latitude || !longitude) return
  uni.openLocation({ latitude: +latitude, longitude: +longitude, name, address })
}
</script>

<style lang="scss" scoped>
.card-style {
  margin: -50rpx 24rpx 0;
  padding: 36rpx 40rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.04);
  position: relative;
  z-index: 3;
}
.card-item {
  &-t1 {
    font-size: 32rpx;
    font-weight: 500;
    color: #333333;
  }
  &-t2 {
    margin-top: 24rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #aaaaaa;
  }
  &-t3 {
    margin-top: 20rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #aaaaaa;
  }
  &-t4 {
    font-size: 24rpx;
    font-weight: 600;
    color: #3d5b98;
  }
}
.card-line {
  margin: 36rpx 0;
  height: 2rpx;
  background-color: #f6f6f6;
}
.card-item-rect {
  margin-top: 36rpx;
  padding: 0 40rpx;
  height: 92rpx;
  background-color: #f9f9f9;
  border: 2rpx solid #f6f6f6;
  border-radius: 12rpx;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
