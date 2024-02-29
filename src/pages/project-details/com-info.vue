<template>
  <view v-if="info.id" class="com-card">
    <view class="com-card-title">
      <text class="com-card-title-text">{{ info.name }}</text>
      <text v-if="info.title" class="com-card-title-tag">{{ info.title }}</text>
    </view>
    <!-- <view v-if="info.tags.length" class="com-card-tags">
      <view v-for="(tag, n) in info.tags" :key="n" class="com-card-tags-item">{{ tag }}</view>
    </view> -->
    <view class="com-card-content">{{ info.intro }}</view>
    <view
      v-if="sourceType == 1 && info.donateLogo"
      class="com-card-use"
      @click="toSelect(info.companyId, info.companyIsJump)"
      ><tc-image width="100%" height="60" mode="widthFix" :src="info.donateLogo"
    /></view>
    <view v-else-if="info.donateLogo" class="com-card-use"
      ><tc-image width="100%" height="60" mode="widthFix" :src="info.donateLogo"
    /></view>
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
  // margin: 24rpx;
  padding: 48rpx 40rpx 80rpx;

  &-title {
    font-size: 0;
    overflow: hidden;
    &-text {
      margin-right: 12rpx;
      vertical-align: middle;
      font-size: 40rpx;
      font-weight: 400;
      color: #333333;
    }
    &-tag {
      vertical-align: middle;
      padding: 0 16rpx;
      height: 40rpx;
      background: linear-gradient(315deg, #60b3ff, #2f6ee5);
      border: 2rpx solid #6ab2ff;
      border-radius: 8rpx;

      font-size: 20rpx;
      font-weight: 400;
      color: #ffffff;

      display: inline-flex;
      align-items: center;
    }
  }

  &-tags {
    margin: 12rpx -16rpx 28rpx;
    font-size: 0;
    overflow: hidden;
    &-item {
      display: inline-block;
      vertical-align: middle;

      margin-top: 16rpx;
      margin-left: 16rpx;
      padding: 8rpx 16rpx;
      border: 2rpx solid #aaaaaa;
      border-radius: 8rpx;

      font-size: 20rpx;
      font-weight: 400;
      color: #aaaaaa;
    }
  }

  &-content {
    margin-top: 36rpx;
    line-height: 44rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #999999;
  }
  &-use {
    margin-top: 32rpx;
    width: 100%;
  }
}
</style>
