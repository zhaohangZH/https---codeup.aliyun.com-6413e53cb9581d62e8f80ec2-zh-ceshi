<template>
  <view class="com-card">
    <view
      @click="toSelect(item.id)"
      v-for="item in info"
      :key="item.id"
      class="com-card-item"
      hover-class="hover-class"
    >
      <view class="com-card-item-info">
        <tc-image width="60" height="60" :src="item.logoUrl" />
        <view class="com-card-item-info-text">
          <text class="com-card-item-info-text-t1">{{ item.name }}</text>
          <text class="com-card-item-info-text-t2">{{ item.title }}</text>
        </view>
      </view>
      <uni-icons type="right" size="14" color="#ccc"></uni-icons>
    </view>
  </view>
</template>

<script setup>
defineProps({
  info: {
    type: Array,
    default: () => []
  }
})
// 1-基金会  2-基金
const toSelect = (id) => {
  uni.navigateTo({ url: `pages/news-details/index?id=${id}&type=1` })
}
</script>

<style lang="scss" scoped>
.com-card {
  margin: 0 24rpx 24rpx;
  padding: 20rpx 0;
  background-color: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.06);
  &-item {
    padding: 24rpx 48rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      &-text {
        margin: 0 24rpx;
        display: flex;
        flex-direction: column;
        &-t1 {
          font-size: 28rpx;
          font-weight: 400;
          color: #333333;
        }
        &-t2 {
          margin-top: 8rpx;
          font-size: 20rpx;
          font-weight: 400;
          color: #666666;
        }
      }
    }
  }
}
</style>
