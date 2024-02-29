<template>
  <bc-navbar title="" :type="3" :custom-style="{ backgroundColor: '#fff' }" :share="false" />
  <view class="campaign-result">
    <view class="result">
      <template>
        <tc-image width="150" height="130" src="!@/icons/i73.png" />
        <text class="result-t1">上传资料成功</text>
        <!-- <text class="result-t2">恭喜您报名成功，请不要忘记准时参加比赛哦~</text> -->
      </template>
    </view>
    <view style="margin-top: 48rpx; margin-bottom: 32rpx">
      <tc-image width="160" height="28" src="!@/icons/i62.png" />
    </view>
  </view>
  <tc-tabbar :z-index="5">
    <view class="tabbar-btn-box" hover-class="hover-class" @click="goHome">
      <view class="tabbar-btn">返回首页</view>
    </view>
  </tc-tabbar>
</template>

<script setup>
const goHome = () => uni.switchTab({ url: 'views/home/index' })
</script>

<style lang="scss" scoped>
.campaign-result {
  padding: 32rpx;
  .result {
    height: 510rpx;
    background-color: #ffffff;
    border-radius: 20rpx;
    box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.06);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &-t1 {
      margin: 90rpx 0 36rpx;
      font-size: 36rpx;
      font-weight: 600;
      color: #23519f;
    }
    &-t2 {
      font-size: 24rpx;
      font-weight: 400;
      color: #aaaaaa;
    }
  }
}
.tabbar-btn {
  width: 630rpx;
  height: 96rpx;
  background-image: linear-gradient(180deg, #5f8aff, #3d55c3);
  border: 2rpx solid #9eb5ea;
  border-radius: 50rpx;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 30rpx;
  font-weight: 400;
  color: #ffffff;

  &-box {
    flex: 1;
    padding: 22rpx 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
