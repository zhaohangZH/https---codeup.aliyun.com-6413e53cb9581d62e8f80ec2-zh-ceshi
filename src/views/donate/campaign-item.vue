<template>
  <view class="com-bd-image-text-card" hover-class="hover-class" @click="gotoInfoDetail">
    <view style="flex-grow: 0; display: flex">
      <tc-image width="180" height="240" radius="12" :src="info.coverImage" />
    </view>
    <view class="com-bd-image-text-card-info">
      <text class="com-bd-image-text-card-info-title tc-line-2">
        {{ info.name }}
      </text>
      <view class="com-bd-image-text-card-info-desc">
        <tc-image width="20" height="20" src="!@/imgs/i_13.png" />
        <text class="com-bd-image-text-card-info-desc-text">
          {{ info.actStartTime }}
        </text>
      </view>
      <view class="com-bd-image-text-card-info-desc">
        <tc-image width="20" height="20" src="!@/imgs/i_14.png" />
        <text class="com-bd-image-text-card-info-desc-text"> {{ info.urbanArea }} </text>
      </view>
      <view class="com-bd-image-text-card-info-desc">
        <!--
          0: 不显示
          1: 未开始
          2: 报名中
          3: 已结束
        -->
        <text
          v-if="info.activityStatus"
          class="com-bd-image-text-card-info-desc-tag"
          :style="activityStatusStyle"
        >
          {{ info.activityStatusName }}
        </text>
        <text v-else></text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  info: {
    type: Object,
    default: () => {}
  }
})
const gotoInfoDetail = () => {
  uni.navigateTo({ url: 'pages/campaign-details/index?id=' + props.info.id })
}
const activityStatusStyle = computed(() => {
  /**
    0: 不显示
    1: 未开始
    2: 报名中
    3: 已结束
  **/
  // const backgroundColor =
  //   ['transparent', '#F0F4FF', '#309A65', '#EEEEEE'][props.info.activityStatus] || 'transparent'
  const color =
    ['transparent', '#3D5B98', '#225497', '#AAA'][props.info.activityStatus] || 'transparent'

  return { color }
})
</script>

<script>
export default {
  options: {
    virtualHost: true
  }
}
</script>

<style lang="scss" scoped>
.com-bd {
  &-image-text-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 48rpx 0 52rpx;
    border-bottom: 2rpx solid #eeeeee;
    &-info {
      flex: 1;
      padding-left: 32rpx;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-title {
        font-size: 28rpx;
        font-weight: 400;
        color: #333333;
        line-height: 44rpx;
        /*多行溢出隐藏*/
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      &-desc {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 20rpx;
        &-text {
          margin-left: 16rpx;
          color: #666;
          font-size: 22rpx;
          font-style: normal;
          font-weight: 400;
          line-height: 24rpx;
        }
        &-tag {
          padding: 0 10rpx;
          height: 34rpx;
          // background-color: #f0f4ff;
          border-radius: 4rpx;

          font-size: 20rpx;
          font-weight: 400;
          // color: #3d5b98;

          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
        &-time {
          font-size: 20rpx;
          font-weight: 400;
          color: #aaaaaa;
        }
      }
    }
  }
}
</style>
