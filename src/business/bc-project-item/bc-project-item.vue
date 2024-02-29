<template>
  <view v-if="info.id" class="card-box">
    <view
      style="display: flex; align-items: center; justify-content: center; position: relative"
      @click="goDetails(info)"
    >
      <tc-image width="638rpx" height="320rpx" radius="12rpx" :src="info.imageUrl" />
      <view v-if="info.status === 3" class="closed-mask" style="border-radius: 12rpx">
        <tc-image width="175rpx" height="170rpx" src="!@/images/project-closed.png" />
      </view>
    </view>
    <!-- <view class="card-title">
      <text class="tc-line-1">{{ info.name }}</text>
    </view> -->
    <scroll-view
      class="card-list"
      scroll-x
      enable-passive
      bounces
      :show-scrollbar="false"
      @scroll="wxs.scroll"
    >
      <view style="padding: 0 32rpx">
        <view
          v-for="item in info.products"
          :key="item.id"
          class="card-item"
          @click="gotoDetails(item)"
        >
          <tc-image width="220rpx" height="220rpx" :src="item.frontImage" />
          <view class="card-item-title">
            <text class="tc-line-1">{{ item.name }}</text>
          </view>
          <view class="card-item-desc tc-line-1">
            <template v-for="(tag, index) in item.tags" :key="index">
              <text v-if="index" class="card-item-desc-line"></text>
              <text class="card-item-desc-t" :class="{ active: !index }">{{ tag }}</text>
            </template>
          </view>
          <!-- 回馈品库存不足  -->
          <view v-if="item.sellout === 1" class="card-item-status">
            <tc-image width="56rpx" height="56rpx" src="!@/images/img981.png" />
          </view>
        </view>
      </view>
    </scroll-view>
    <view v-if="(info.products || []).length > 2" class="card-progress">
      <view class="js-progress-bar card-progress-bar"></view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
})
const gotoDetails = (item) => {
  if (props.info.status === 3 || item.sellout === 1) {
    return uni.showToast({ icon: 'none', title: '此回馈已结束' })
  }
  uni.navigateTo({ url: `pages/project-details/index?id=${props.info.id}&goodsId=${item.id}` })
}
const goDetails = (item) => {
  if (item.isFeedback) {
    uni.navigateTo({ url: `pages/project/index?id=${item.id}` })
  } else {
    uni.navigateTo({ url: `pages/project-details/index?id=${item.id}` })
  }
}
</script>

<!-- #ifdef APP-VUE || MP-WEIXIN || MP-QQ || H5 -->
<script src="./wxs.wxs" module="wxs" lang="wxs"></script>
<!-- #endif -->

<style lang="scss" scoped>
.card-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-title {
  padding: 38rpx 32rpx;
  font-size: 24rpx;
  font-weight: 400;
  color: #333333;
}
.card-list {
  white-space: nowrap;
  font-size: 0;
  position: relative;
}
.card-item {
  margin-top: 40rpx;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  vertical-align: middle;

  position: relative;

  & + .card-item {
    margin-left: 44rpx;
  }

  &-title {
    width: 220rpx;
    padding: 20rpx 0;

    font-size: 24rpx;
    // font-weight: 700;
    color: #333333;

    text-align: center;
  }

  &-desc {
    width: 220rpx;
    font-size: 0;
    text-align: center;

    &-line {
      display: inline-block;
      vertical-align: middle;
      margin: 0 12rpx;
      width: 2rpx;
      height: 24rpx;
      background-color: #eeeeee;
    }

    &-t {
      display: inline-block;
      vertical-align: middle;
      font-size: 20rpx;
      font-weight: 400;
      color: #cccccc;

      &.active {
        color: #496ed9;
      }
    }
  }

  &-status {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    border-radius: 14rpx;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.card-progress {
  margin-top: 40rpx;
  width: 108rpx;
  border-bottom: 2rpx solid #eee;

  &-bar {
    width: 36rpx;
    height: 4rpx;
    background-color: #666666;
  }
}

.closed-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.4);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
