<template>
  <bc-navbar :type="1" :custom-style="{ backgroundColor: '#fff' }" :share="false" />
  <view class="verification flex-col justify-cente items-center">
    <text class="verification_title">回馈品现场核销系统</text>
    <view class="verification_img">
      <tc-image width="350rpx" height="350rpx" src="!@/write-off/icon_04.png" />
    </view>
    <view class="verification_btn active flex-row justify-center items-center" @click="toScan"
      >扫码核销</view
    >
    <view class="verification_btn flex-row justify-center items-center" @click="toRecord"
      >核销记录</view
    >
  </view>
</template>
<script setup>
import { useScanCode } from '@/hooks/useScanCode'
const toScan = async () => {
  const [err, res] = await useScanCode()
  if (!err) {
    console.log(res)
  }
}
const toRecord = () => {
  uni.navigateTo({ url: 'write-off/verification-record/index' })
}
</script>
<style lang="scss" scoped>
.verification {
  padding: 80rpx 80rpx;
  margin: 32rpx 32rpx;
  border-radius: 32rpx;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
  background: #fff;
  &_title {
    position: relative;
    line-height: 60rpx;
    font-size: 36rpx;
    color: #294179;
    font-weight: bold;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -30rpx;
      margin: auto;
      width: 30rpx;
      height: 8rpx;
      border-radius: 50px;
      background: #526dac;
    }
  }
  &_img {
    margin-top: 140rpx;
  }
  &_btn {
    margin-bottom: 48rpx;
    width: 530rpx;
    height: 96rpx;
    border-radius: 50px;
    border: #eee 2rpx solid;
    font-size: 30rpx;
    color: #666;
    background: #f9f9f9;
    &.active {
      margin-top: 120rpx;
      color: #fff;
      font-weight: bold;
      border-color: #9eb5ea;
      background-image: linear-gradient(180deg, #5f8aff 0%, #3d55c3 100%);
    }
  }
}
</style>
