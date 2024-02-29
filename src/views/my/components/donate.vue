<template>
  <view class="flex-row justify-between items-center my_content_fun_donate">
    <view class="my_content_fun_donate_left">
      <view class="my_content_fun_donate_left_top">
        <text class="my_content_fun_donate_left_top_m">￥</text>
        <text class="my_content_fun_donate_left_top_b">{{
          handleCount(userCounts.donatedAmount)
        }}</text>
      </view>
      <view class="my_content_fun_donate_left_bot">平台累计公益贡献</view>
    </view>
    <view
      class="flex-row justify-center items-center my_content_fun_donate_rig"
      hover-class="hover-class"
      :class="{ active: userCounts.donatedAmount }"
      @click="entryClick"
      >查看明细</view
    >
  </view>
</template>
<script setup>
const props = defineProps({
  userCounts: {
    type: Object,
    default: () => ({})
  }
})

const handleCount = (n) => (n ? (n > 99 ? '99+' : n) : '----')
// userCounts.donatedAmount善款
// userCounts.projectCount项目
const entryClick = () => {
  if (!props.userCounts.donatedAmount) return
  uni.navigateTo({
    url: '/pages/my-donate/index'
  })
}
</script>
<style lang="scss" scoped>
// 我的捐赠
.my_content_fun_donate {
  margin: 48rpx 48rpx 0;
  padding: 44rpx 48rpx 48rpx 60rpx;
  height: 180rpx;
  border-radius: 50px;
  border: 2px solid #f9f9f9;
  background: #fff;
  box-sizing: border-box;
  &_left {
    color: #225497;
    &_top {
      &_m {
        line-height: 32rpx;
        font-size: 32rpx;
      }
      &_b {
        line-height: 44rpx;
        font-size: 44rpx;
      }
    }
    &_bot {
      margin-top: 20rpx;
      color: #666;
      font-family: OPPOSans;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 24rpx;
    }
  }
  &_rig {
    margin-left: 30rpx;
    width: 168rpx;
    height: 84rpx;
    font-family: OPPOSans;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    border-radius: 50px;
    color: #ccc;
    border: 1px solid #eee;
    background: #f9f9f9;

    &.active {
      color: #225497;
      border-color: #e4f1ff;
      background: #f8fbff;
    }
  }
}
</style>
