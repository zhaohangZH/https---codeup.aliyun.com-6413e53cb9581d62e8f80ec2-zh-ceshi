<template>
  <view class="flex-row items-center cultural_item" @click="onDetails">
    <tc-image :src="item.coverImage" width="104" height="104" mode="widthFix" />
    <view class="flex-1 cultural_item_text">
      <view class="cultural_item_name tc-line-1">{{ item.title }}</view>
      <view class="cultural_item_tag tc-line-1">{{ item.description }}</view>
    </view>
  </view>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})
// 详情页
const onDetails = () => {
  if (props.item.donationStatus == 1 || 1) {
    uni.navigateTo({
      url: `pages/project-details/index?id=${props.item.projectId}&sourceType=${props.item.sourceType}&businessId=${props.item.id}`
    })
  } else {
    uni.showToast({ icon: 'none', title: '活动结束' })
  }
}
</script>
<style lang="scss" scoped>
.cultural_item {
  padding: 48rpx 0 52rpx;
  border-bottom: 2rpx solid #eee;

  &_text {
    margin-left: 32rpx;
  }
  &_name {
    color: #225497;
    font-family: OPPOSans;
    font-size: 32rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 34rpx; /* 107.692% */
  }
  &_tag {
    margin-top: 28rpx;
    color: #666;
    font-family: OPPOSans;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 24rpx; /* 100% */
  }
}
</style>
