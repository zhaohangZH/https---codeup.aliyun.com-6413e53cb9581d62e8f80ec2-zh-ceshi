<template>
  <view v-if="infoData.totalCount" class="com-card">
    <view class="flex-row justify-between items-center com-card-title">
      <view class="flex-row items-center com-card-title-left">
        <tc-image width="30" height="32" src="!@/imgs/icon-logo-b.png" mode="widthFix" />
        <text>捐赠留言</text>
      </view>
      <view
        v-if="infoData.totalCount > 5"
        class="flex-row items-center com-card-title-rigth"
        @click="isshows = true"
      >
        <text>更多留言</text>
        <uni-icons type="right" size="14" color="#999"></uni-icons>
      </view>
    </view>
    <template v-for="item in infoData.data" :key="item.id">
      <view class="com-card-item">
        <view class="com-card-item-info">
          <tc-image
            width="84"
            height="84"
            radius="50"
            :src="item.headImageUrl || '!@/imgs/tx.png'"
          />
          <view class="com-card-item-info-text">
            <text class="com-card-item-info-text-t1">{{ item.nickName }}</text>
            <text class="com-card-item-info-text-t2">捐赠￥{{ item.remark }}</text>
          </view>
        </view>
        <text class="com-card-item-info-text-t3">{{ item.paymentTime }}</text>
      </view>
      <view class="com-card-item-content">
        <view class="com-card-item-content-inner">{{ item.message }}</view>
      </view>
    </template>
  </view>
  <com-popup-message v-model:isshow="isshows" v-model:infoId="infoId.id" />
</template>
<script setup>
import comPopupMessage from './com/com-popup-message.vue'
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
</script>
<style lang="scss" scoped>
.com-card {
  padding: 0 40rpx 84rpx;
  &-title {
    &-left {
      text {
        margin-left: 24rpx;
        color: #333;
        font-size: 36rpx;
        font-weight: 400;
      }
    }
    &-rigth {
      line-height: 42rpx;
      color: #999;
      text {
        font-size: 20rpx;
      }
    }
  }
  &-item {
    margin-top: 60rpx;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
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
          margin-top: 16rpx;
          font-size: 22rpx;
          font-weight: 400;
          color: #225497;
        }
        &-t3 {
          font-size: 24rpx;
          font-weight: 400;
          color: #aaaaaa;
        }
      }
    }

    &-content {
      &-inner {
        padding: 24rpx 0;
        border-bottom: 2rpx solid #eee;

        font-size: 24rpx;
        font-weight: 400;
        color: #000;
        line-height: 40rpx;
      }
    }
  }
}
</style>
