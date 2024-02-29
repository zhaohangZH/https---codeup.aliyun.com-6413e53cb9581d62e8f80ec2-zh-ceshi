<template>
  <view v-if="info.id" class="com-card">
    <view class="com-card-title">
      <text class="com-card-title-text">{{ info.name }}</text>
    </view>
    <view class="com-card-icons">
      <view class="com-card-icons-item">
        <tc-image width="21" height="21" mode="widthFix" src="!@/icons/i18.png" />
        <text class="com-card-icons-item-text">北地大定制 ·</text>
      </view>
      <view class="com-card-icons-item">
        <tc-image width="20" height="20" mode="widthFix" src="!@/icons/i19.png" />
        <text class="com-card-icons-item-text">回馈文创品 ·</text>
      </view>
      <view class="com-card-icons-item">
        <tc-image width="22" height="22" mode="widthFix" src="!@/icons/i72.png" />
        <text class="com-card-icons-item-text">活动限定</text>
      </view>
    </view>
    <!-- <view v-if="info.spec.length" class="com-card-specs">
      <view v-for="item in info.spec" :key="item" class="com-card-specs-box">
        <text class="com-card-specs-tit">{{ item.key }}</text>
        <view class="com-card-specs-rig">
          <text v-for="it in item.value" :key="it" class="com-card-specs-btn">{{ it }}</text>
        </view>
      </view>
    </view> -->
  </view>
</template>
<script setup>
defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
})
</script>
<style lang="scss" scoped>
.com-card {
  margin: 24rpx;
  padding: 40rpx 40rpx 48rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.06);

  &-title {
    font-size: 0;
    overflow: hidden;
    &-text {
      margin-right: 12rpx;
      vertical-align: middle;
      font-size: 36rpx;
      font-weight: 400;
      color: #333333;
      line-height: 60rpx;
    }
  }

  &-icons {
    display: flex;
    align-items: center;
    margin-top: 32rpx;
    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 13rpx;
      &-text {
        margin-left: 10rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #3d5b98;
      }
    }
  }
  &-specs {
    margin-top: 40rpx;
    font-size: 22rpx;
    border-top: 2rpx solid #f9f9f9;
    &-box {
      display: flex;
    }
    text {
      display: inline-block;
      padding: 14rpx 24rpx;
      border-radius: 10rpx;
    }
    &-tit {
      margin-top: 40rpx;
      margin-right: 40rpx;
      color: #999999;
    }
    &-btn {
      margin-bottom: 20rpx;
      margin-right: 24rpx;
      color: #333333;
      background: #f9f9f9;
    }
    &-rig {
      flex: 1;
      margin-top: 40rpx;
    }
  }
}
</style>
