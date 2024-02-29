<template>
  <view class="cultural_item" @click="onDetails">
    <view class="cultural_item_img">
      <tc-image :src="item.frontImage" width="100%" height="320" mode="widthFix" />
    </view>
    <view class="cultural_item_name">{{ item.name }}</view>
    <view class="cultural_item_tag">{{ item.tag }}</view>

    <view v-if="item.sellout === 1" class="cultural_item_status">
      <tc-image width="72rpx" height="72rpx" src="!@/imgs/i_12.png" />
    </view>
  </view>
</template>
<script setup>
const props = defineProps({
  info: {
    type: Object,
    default: () => {}
  },
  item: {
    type: Object,
    default: () => {}
  }
})
// 详情页
const onDetails = () => {
  if (props.info.status === 3 || props.item.sellout === 1) {
    return uni.showToast({ icon: 'none', title: '活动结束' })
  }
  uni.navigateTo({
    url: `pages/project-details/index?id=${props.info.id}&goodsId=${props.item.id}`
  })
}
</script>
<style lang="scss" scoped>
.cultural_item {
  position: relative;
  padding-bottom: 24rpx;
  &_img {
    background: #fff;
  }
  &_name {
    margin-top: 24rpx;
    color: #000;
    font-family: OPPOSans;
    font-size: 26rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 28rpx; /* 107.692% */
  }
  &_tag {
    margin-top: 16rpx;
    color: #004e97;
    font-family: OPPOSans;
    font-size: 20rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 20rpx; /* 100% */
  }
  &_status {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
