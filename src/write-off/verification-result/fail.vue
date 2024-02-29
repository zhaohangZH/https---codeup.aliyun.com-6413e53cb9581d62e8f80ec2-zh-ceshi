<template>
  <bc-navbar
    :type="4"
    title="扫码失败"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <view class="verification_fail">
    <view
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 150rpx;
        height: 150rpx;
      "
    >
      <tc-image width="100" height="100" src="!@/icons/i39.png" />
    </view>
    <text class="verification_fail-text">{{ text }}</text>
  </view>
  <view class="verification_fail_btn active flex-row justify-center items-center" @click="goBack"
    >返回扫码</view
  >
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
const text = ref('')
onLoad((option) => {
  text.value = option.text
})

const goBack = () => uni.navigateBack({ delta: 1 })
</script>
<style lang="scss" scoped>
.verification_fail {
  margin: 32rpx;
  padding: 80rpx 40rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.06);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &-text {
    margin-top: 70rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #333333;
  }
}
.verification_fail_btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 100rpx;
  margin: auto;
  width: 630rpx;
  height: 96rpx;
  box-sizing: border-box;
  border-radius: 50px;
  border: #9eb5ea 2rpx solid;
  font-size: 30rpx;
  color: #fff;
  font-weight: bold;
  background-image: linear-gradient(180deg, #5f8aff 0%, #3d55c3 100%);
}
</style>
