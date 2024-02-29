<template>
  <view v-if="info.totalNum" class="com-card">
    <view class="flex-row items-center com-card-title">
      <tc-image width="30" height="32" src="!@/imgs/icon-logo-b.png" mode="widthFix" />
      <text>项目筹款进展</text>
    </view>
    <view class="flex-col com-card-part">
      <tc-image width="100%" height="80" src="!@/imgs/i_05.png" mode="widthFix" />
      <view class="com-card-info">
        <view class="flex-row justify-between items-center com-card-info-item">
          <text class="com-card-info-item-k">本项目累计筹集善款：</text>
          <view class="flex-row items-center" @click="info.totalNum ? (isshows = true) : null">
            <text class="com-card-info-item-v"
              ><text class="com-card-info-item-v-t">￥</text>{{ info.totalAmount }}</text
            >
            <uni-icons type="right" size="14" color="#ccc"></uni-icons>
          </view>
        </view>
        <view class="flex-row justify-between items-center com-card-info-item">
          <text class="com-card-info-item-k">本项目累计捐赠人次：</text>
          <view class="flex-row items-center" @click="info.totalNum ? (isshows = true) : null">
            <text class="com-card-info-item-v"
              >{{ info.totalNum }} <text class="com-card-info-item-v-t">人</text></text
            >
            <uni-icons type="right" size="14" color="#ccc"></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
  <com-popup-donation v-model:isshow="isshows" v-model:infoId="infoId.id" />
</template>
<script setup>
import comPopupDonation from './com/com-popup-donation.vue'
import { getProjectPayList } from '@/api/index'
import { ref } from 'vue'
const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  },
  infoObj: {
    type: Object,
    default: () => ({})
  }
})
const isshows = ref(false)
const infoData = ref(props.info)
const infoId = ref(props.infoObj)
const pageIndex = ref(1)
const getPayList = async () => {
  pageIndex.value++
  const p = {
    id: props.infoObj.id,
    pageIndex: pageIndex.value,
    pageSize: 5
  }
  const [err, res] = await getProjectPayList(p)
  if (!err) {
    const { result } = res
    infoData.value.totalCount = result.totalCount
    infoData.value.totalPage = result.totalPage
    infoData.value.data = infoData.value.data.concat(result.data)
  }
}
</script>
<style lang="scss" scoped>
.com-card {
  padding: 0 40rpx 100rpx;
  &-title {
    text {
      margin-left: 24rpx;
      color: #333;
      font-size: 36rpx;
      font-weight: 400;
    }
  }
  &-part {
    padding: 40rpx 0 0;
    border-radius: 16rpx;
  }

  &-info {
    margin-top: 8rpx;

    &-item {
      margin-top: 32rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      line-height: 36rpx;

      &-k {
        font-size: 24rpx;
        font-weight: 400;
        color: #666666;
      }
      &-v {
        margin-left: 22rpx;
        margin-right: 24rpx;
        font-size: 32rpx;
        font-weight: 700;
        color: #225497;
        &-t {
          font-size: 24rpx;
        }
      }
    }
  }
}
</style>
