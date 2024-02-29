<template>
  <view class="verification_record_item">
    <view class="verification_record_item_code flex-row items-center"
      ><tc-image
        width="22rpx"
        height="24rpx"
        mode="widthFix"
        src="!@/write-off/icon_02.png"
      ></tc-image
      ><text @click="setClip(item.orderId)">{{ item.orderId }}</text></view
    >
    <view class="verification_record_item_main flex-row">
      <tc-image width="160rpx" height="160rpx" :src="item.imageUrl"></tc-image>
      <view class="verification_record_item_main_text">
        <view class="verification_record_item_main_text_title">{{ item.name }}</view>
        <view class="verification_record_item_main_text_f_title">{{ item.spec }}</view>
      </view>
    </view>
    <view class="verification_record_item_phone flex-row items-center"
      ><tc-image
        width="24rpx"
        height="24rpx"
        mode="widthFix"
        src="!@/write-off/icon_03.png"
      ></tc-image
      ><text>用户手机号：{{ item.userMobile }}</text></view
    >
  </view>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    define: () => {}
  }
})
// 复制单号
const setClip = (string) => {
  uni.setClipboardData({
    data: string
  })
}
</script>
<style lang="scss" scoped>
.verification_record_item {
  padding: 32rpx 32rpx;
  margin-top: 32rpx;
  border-radius: 32rpx;
  background: #fff;
  &_code {
    font-size: 24rpx;
    color: #999999;
    text {
      margin-left: 12rpx;
    }
  }
  &_main {
    margin: 32rpx 0;
    &_text {
      flex: 1;
      margin-left: 28rpx;
      &_title {
        line-height: 34rpx;
        font-size: 30rpx;
      }
      &_f_title {
        margin-top: 20rpx;
        font-size: 26rpx;
        color: #999999;
      }
    }
  }
  &_phone {
    font-size: 24rpx;
    color: #666;
    text {
      margin-left: 8rpx;
    }
  }
}
</style>
