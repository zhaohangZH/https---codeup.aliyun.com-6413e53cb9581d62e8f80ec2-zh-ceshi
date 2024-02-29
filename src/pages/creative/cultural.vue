<template>
  <view v-for="it in info" :key="it.id" class="page-box">
    <view class="page-sub-title">
      <tc-image width="300rpx" height="84rpx" mode="heightFix" :src="it.iconUrl" />
    </view>
    <view class="page-list">
      <view
        v-for="item in it.goodsCulturals"
        :key="item.id"
        class="page-item"
        @click="gotoDetails(item)"
      >
        <view class="page-item-img">
          <tc-image width="180rpx" height="180rpx" :src="item.frontImage" />
          <text v-if="item.rarity" class="page-item-tab">{{ item.rarity }}</text>
        </view>
        <view class="page-item-title">
          <text class="tc-line-1">{{ item.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
// import { getGoodsCulturalList } from '@/api/goods'
const props = defineProps({
  type: {
    type: Number,
    define: 1
  },
  info: {
    type: Array,
    define: () => []
  }
})
// onMounted(() => {
//   ;(async () => {
//     const [err, res] = await getGoodsCulturalList({ pageIndex: 1, pageSize: 20 })
//     if (!err) {
//       const { result } = res
//       info.value = result.data
//     }
//   })()
// })

const gotoDetails = (item) => {
  props.type == 1
    ? uni.navigateTo({
        url: `pages/creative-details/index?id=${item.id}`
      })
    : '另一个'
}
</script>
<style lang="scss" scoped>
.page-box {
  margin: 24rpx 24rpx 0;
  padding: 32rpx 40rpx;
  background-color: #ffffff;
  border-radius: 32rpx;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.04);
  text-align: center;
  &:last-of-type {
    margin-bottom: 60rpx;
  }
}
.page-sub-title {
  margin-top: 12rpx;
  font-size: 24rpx;
}
.page-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  font-size: 0;
  padding-bottom: 20rpx;
}
.page-item {
  margin-top: 40rpx;
  margin-bottom: 20rpx;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 33.333%;
  vertical-align: middle;
  position: relative;
  &-img {
    position: relative;
  }
  &-tab {
    position: absolute;
    right: 16rpx;
    bottom: 16rpx;
    padding: 0 10rpx;
    line-height: 26rpx;
    color: #fff;
    font-size: 16rpx;
    font-weight: bold;
    border-radius: 10rpx;
    background-image: linear-gradient(180deg, #5b95df 0%, #4961cd 100%);
  }
  &-title {
    margin-top: 30rpx;
    width: 180rpx;
    font-size: 24rpx;
    /* font-weight: 700; */
    color: #333333;

    text-align: center;
  }
}
</style>
