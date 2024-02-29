<template>
  <view class="flex-row box_li1" @click="gotoInfoDetail">
    <tc-image width="180rpx" height="180rpx" radius="24rpx" :src="item.coverImage" />
    <view class="box_li1_content flex-col">
      <view>{{ item.name }}</view>
      <view class="flex-row justify-between box_li1_content_main">
        <text class="box_li1_content_text">{{ item.signStartTime }}</text>
        <view class="box_li1_content_btn" :class="{ active: item.gameStatus == 2 }">{{
          item.gameStatusName
        }}</view>
      </view>
    </view>
  </view>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {}
    }
  }
})
const gotoInfoDetail = () => {
  // isPopularity启动点赞
  if (props.item.isPopularity == 1 && props.item.gameStatus == 4) {
    uni.navigateTo({ url: 'pages/column-vote/index?id=' + props.item.id })
  } else {
    uni.navigateTo({ url: 'pages/column-details/index?id=' + props.item.id })
  }
  // uni.navigateTo({ url: 'pages/column-vote/index?id=' + props.item.id })

  // uni.navigateTo({ url: 'pages/column-from/index?id=' + props.item.id })
}
</script>
<style lang="scss" scoped>
.box_li1 {
  margin-top: 24rpx;
  padding: 20rpx 28rpx;
  border-radius: 28rpx;
  background: #f9f9f9;
  &_content {
    position: relative;
    flex: 1;
    margin-left: 30rpx;
    height: 180rpx;
    line-height: 48rpx;
    font-size: 30rpx;
    color: #333333;
    &_main {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 18rpx;
    }
    &_text {
      line-height: 32rpx;
      color: #666;
      font-size: 26rpx;
    }
    &_btn {
      padding: 0 12rpx;
      line-height: 32rpx;
      font-size: 18rpx;
      color: #fff;
      border-radius: 4rpx;
      background: #aaa;
      &.active {
        color: #fff;
        background: #309a65;
      }
    }
  }
}
</style>
