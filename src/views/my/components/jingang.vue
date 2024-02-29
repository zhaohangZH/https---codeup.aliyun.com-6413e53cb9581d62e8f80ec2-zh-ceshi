<template>
  <view class="my_content_fun1">
    <view class="my_content_fun1_op" hover-class="hover-class" @click="toCampaign">
      <view class="my_content_fun1_op_text">
        <text class="my_content_fun1_op_name">参加活动</text>
        <text class="my_content_fun1_op_num">{{ handleCount(userCounts.activityCount) }}</text>
      </view>
      <view class="my_content_fun1_op_bj">
        <tc-image width="160" height="160" src="!@/user/i_01.png" mode="widthFix" />
      </view>
    </view>
    <view class="my_content_fun1_op" hover-class="hover-class" @click="toCertificate">
      <view class="my_content_fun1_op_text">
        <text class="my_content_fun1_op_name">捐赠证书</text>
        <text class="my_content_fun1_op_num">{{ handleCount(userCounts.certificateCount) }}</text>
      </view>
      <view class="my_content_fun1_op_bj">
        <tc-image width="160" height="160" src="!@/user/i_02.png" mode="widthFix" />
      </view>
    </view>
  </view>
</template>
<script setup>
const props = defineProps({
  userCounts: {
    type: Object,
    default: () => ({})
  }
})
const handleCount = (n) => (n ? (n > 99 ? '99+' : n) : '-')
const toCampaign = () => {
  uni.navigateTo({
    url: '/pages/my-campaign/index'
  })
}
const toCertificate = () => {
  uni.navigateTo({
    url: '/pages/my-certificate/index'
  })
}
</script>
<style lang="scss" scoped>
.my_content_fun1 {
  display: flex;
  justify-content: space-between;
  // margin-top: 72rpx;
  padding: 0 48rpx;
  &_op {
    position: relative;
    padding: 32rpx 40rpx;
    flex: 1;
    height: 176rpx;
    color: #333;
    box-sizing: border-box;
    border-radius: 24rpx;
    border: 2rpx solid #dfe9f3;
    background: #f6faff;
    overflow: hidden;
    &:nth-child(2) {
      margin-left: 30rpx;

      border-radius: 12px;
      border: 1px solid #f3e9df;
      background: #faf9f7;
      .my_content_fun1_op_num {
        color: #bf6f42;
      }
    }
    &_text {
      display: flex;
      flex-direction: column;
    }
    &_name {
      line-height: 30rpx;
      font-size: 30rpx;
    }
    &_num {
      margin-top: 32rpx;
      line-height: 44rpx;
      font-size: 44rpx;
      font-family: DINPro, DINPro-Bold;
      font-weight: bold;
      color: #004e97;
    }
    &_bj {
      position: absolute;
      right: -36rpx;
      bottom: -32rpx;
      // ::v-deep {
      //   image {
      //     position: absolute;
      //     bottom: 0;
      //     right: 0;
      //   }
      // }
    }
  }
}
</style>
