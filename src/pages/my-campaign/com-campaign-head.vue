<template>
  <view class="com-box">
    <view class="com-box-info">
      <tc-image width="64rpx" height="64rpx" src="!@/icons/i78.png" />
      <view class="com-box-info-item">
        <text class="com-box-info-t1">{{ normalCount }}</text>
        <text class="com-box-info-t2">报名活动</text>
      </view>
      <view class="com-box-info-item">
        <text class="com-box-info-t1">{{ awaitCount }}</text>
        <text class="com-box-info-t2">候补活动</text>
      </view>
    </view>
    <view class="com-scan-btn" hover-class="hover-class" @click="scanCode">
      <tc-image width="28rpx" height="28rpx" src="!@/icons/i77.png" />
      <text style="margin-left: 12rpx">活动签到</text>
    </view>
  </view>
</template>

<script setup>
import { getIsSignIn } from '@/api/activity.js'
import { useScanCode } from '@/hooks/useScanCode'
const props = defineProps({
  awaitCount: {
    type: [Number, String],
    default: 0
  },
  normalCount: {
    type: [Number, String],
    default: 0
  }
})

let scanCodeIng = false
const scanCode = async () => {
  if (scanCodeIng) return
  scanCodeIng = true
  const [err, res] = await getIsSignIn()
  if (!err) {
    const { result = {} } = res
    if (result.isSignIn) {
      await useScanCode()
    } else {
      uni.showToast({ icon: 'none', title: result.message || '无法签到' })
    }
  }
  scanCodeIng = false
}
</script>

<style lang="scss" scoped>
.com-box {
  padding: 38rpx 28rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0rpx 8rpx 16rpx 0rpx #e7e7ea;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
.com-box-info {
  width: 400rpx;
  height: 64rpx;
  padding: 0 42rpx 0 20rpx;
  border-right: 2rpx solid #e9e9e9;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &-t1 {
    font-size: 36rpx;
    font-weight: 500;
    color: #333333;
  }

  &-t2 {
    font-size: 22rpx;
    font-weight: 400;
    color: #666666;
  }
}
.com-scan-btn {
  width: 188rpx;
  height: 64rpx;
  background: linear-gradient(180deg, #5f8aff, #3d55c3);
  border-radius: 50rpx;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 22rpx;
  color: #ffffff;
}
</style>
