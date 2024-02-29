<template>
  <bc-navbar :type="3" :custom-style="{ backgroundColor: '#fff' }" :share="false" />
  <view class="result">
    <view style="display: flex; align-items: center; justify-content: center">
      <!-- isReceive当场领取 -->
      <tc-image width="160" height="160" src="!@/imgs/i_21.png" />
    </view>
    <view class="result_text">实名认证通过，感谢您的支持！</view>
  </view>
  <tc-tabbar v-if="!isDisabled" :z-index="98">
    <view class="flex-col justify-start items-center button" @click="goHome">返回首页</view>
  </tc-tabbar>
</template>
<script setup>
const goHome = () => uni.switchTab({ url: 'views/home/index' })
</script>
<style lang="scss" scoped>
.result {
  padding: 60rpx 0 80rpx;
  background: #fff;
  &_text {
    padding: 40rpx 140rpx 0;
    color: #333;
    text-align: center;
    font-family: OPPOSans;
    font-size: 30rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 56rpx; /* 186.667% */
  }
}
.button {
  margin: 20rpx auto;
  width: calc(100% - 64rpx);

  line-height: 96rpx;
  border-radius: 20rpx;
  background: #225497;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  font-size: 30rpx;
  font-weight: 400;
  color: #ffffff;
}
</style>
