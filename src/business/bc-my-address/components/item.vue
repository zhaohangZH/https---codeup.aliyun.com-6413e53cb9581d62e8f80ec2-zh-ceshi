<template>
  <view class="flex-col list-item">
    <view class="flex-row space-x-6">
      <text class="font_1">{{ item.provinceName }}</text>
      <text class="font_1">{{ item.cityName }}</text>
      <text class="font_1">{{ item.areaName }}</text>
    </view>
    <view class="flex-row justify-between items-center group_5 space-x-35">
      <text class="font_2" style="font-family: TsangerYuMo-3">{{ item.address }}</text>
      <view
        class="flex-col justify-start items-center shrink-0"
        @click="emits('setAdd', { ...item })"
        v-if="!fromType"
      >
        <tc-image src="!@/imgs/i_19.png" mode="widthFix" width="28" height="28" />
      </view>
      <view
        class="flex-col justify-start items-center shrink-0"
        @click="emits('selectItem', { ...item })"
        v-else
      >
        <tc-image src="!@/imgs/i_20.png" mode="widthFix" width="28" height="28" />
      </view>
    </view>
    <view class="flex-row group_6 space-x-20">
      <text class="font_4">{{ item.name }}</text>
      <text class="font_5">{{ item.mobile }}</text>
    </view>
  </view>
</template>
<script setup>
const popup = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  fromType: {
    type: [Number, String],
    default: 0
  }
})
const emits = defineEmits(['setAdd', 'selectItem'])
</script>
<style lang="scss" scoped>
.list-item {
  padding: 52rpx 0;
  border-bottom: 2rpx solid #f9f9f9;
  .space-x-7 {
    margin-bottom: 24rpx;
    & > view:not(:first-child),
    & > text:not(:first-child),
    & > image:not(:first-child) {
      margin-left: 14rpx;
    }
    .text_3 {
      color: #3d5b98;
      font-size: 24rpx;
      line-height: 28rpx;
    }
  }
  .space-x-6 {
    & > view:not(:first-child),
    & > text:not(:first-child),
    & > image:not(:first-child) {
      margin-left: 12rpx;
    }
  }
  .font_1 {
    font-size: 24rpx;
    line-height: 30rpx;
    color: #666666;
  }
  .font_2 {
    font-size: 32rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .group_5 {
    margin-top: 12rpx;
  }
  .space-x-35 {
    & > view:not(:first-child),
    & > text:not(:first-child),
    & > image:not(:first-child) {
      margin-left: 70rpx;
    }
  }
  .group_6 {
    margin-top: 10rpx;
    .font_4 {
      font-size: 24rpx;
      line-height: 30rpx;
      color: #999999;
    }
    .font_5 {
      font-size: 24rpx;
      line-height: 30rpx;
      color: #999999;
    }
  }
  .space-x-20 {
    & > view:not(:first-child),
    & > text:not(:first-child),
    & > image:not(:first-child) {
      margin-left: 40rpx;
    }
  }
}
</style>
