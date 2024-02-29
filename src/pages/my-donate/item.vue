<template>
  <view class="flex-col my_donate_item">
    <view class="my_donate_item_time"> 付款时间：{{ item.recDate }} </view>
    <view class="flex-row items-center my_donate_item_main">
      <tc-image
        :src="item.projectImageUrl"
        width="180"
        height="180"
        radius="20"
        mode="aspectFill"
      />
      <view class="flex-col my_donate_item_main_rig">
        <view class="my_donate_item_main_rig_name">
          {{ item.projectName }}
        </view>
        <view class="my_donate_item_main_rig_tit"> 捐赠金额 </view>
        <view class="my_donate_item_main_rig_amount"
          ><text class="y">￥</text><text>{{ item.amount }}</text></view
        >
      </view>
    </view>
  </view>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})
</script>
<style lang="scss" scoped>
.my_donate_item {
  padding: 48rpx 40rpx 40rpx;
  border-bottom: 2rpx solid #eee;
  background: #fff;
  &_time {
    color: #aaa;
    font-family: OPPOSans;
    font-size: 26rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 26rpx;
  }
  &_main {
    margin-top: 40rpx;
    &_rig {
      margin-left: 40rpx;
      &_name {
        font-size: 32rpx;
        color: #000;
      }
      &_tit {
        margin-top: 32rpx;
        font-size: 24rpx;
        color: #666;
      }
      &_amount {
        margin-top: 28rpx;
        font-size: 36rpx;
        color: #004e97;
        font-family: OPPOSans;
        font-style: normal;
        font-weight: 400;
        line-height: 36rpx;
        .y {
          font-size: 28rpx;
        }
      }
    }
  }
}
</style>
