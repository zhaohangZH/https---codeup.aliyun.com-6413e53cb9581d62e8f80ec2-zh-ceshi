<template>
  <view class="order_item" @click="onOrderDetails">
    <view class="order_item_top">
      <view class="order_item_top_time">
        <!-- <tc-image width="20" height="20" src="!@/address/icon_01.png" /> -->
        订单时间：{{ item.recDate }}</view
      >
      <view class="order_item_top_tag">{{ item.tag }}</view>
    </view>
    <view class="flex-row items-center order_item_main">
      <view class="order_item_main_img"
        ><tc-image :src="item.imageUrl" radius="20" width="180" height="180" mode="widthFix"
      /></view>
      <view class="order_item_main_text">
        <text class="order_item_main_text_tit">{{ item.name }}</text>
        <text v-for="it in item.specList" :key="it.key" class="order_item_main_text_sub"
          >{{ it.key }}:{{ it.value }}</text
        >
        <text class="order_item_main_text_tag">{{ item.tag }}</text>
      </view>
    </view>
    <view class="order_item_logistics" @click.prevent="qrGet">
      <view class="order_item_logistics_left">
        <tc-image :src="'!@/order/i_0' + type + '.png'" width="24" height="24" mode="widthFix" />
        <text>{{ item.statusName }}</text></view
      >
      <view class="order_item_logistics_rigth tc-line-1">{{ item.expressInfo }}</view>
    </view>
  </view>
</template>
<script setup>
const emits = defineEmits(['qrShow'])

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  type: {
    type: [Number, String],
    default: 1
  }
})
//显示二维码
const qrGet = () => {
  // if (!props.item.isReceive || props.item.status != 2) return
  emits('qrShow', props.item.orderId)
}

// 详情页
const onOrderDetails = () => {
  uni.navigateTo({
    url: '/pages/my-order-details/index?id=' + props.item.orderId
  })
}
</script>
<style lang="scss" scoped>
.order_item {
  padding: 0 40rpx 60rpx;
  &_top {
    display: flex;
    justify-content: space-between;
    font-size: 26rpx;
    &_time {
      color: #aaa;
    }
    &_tag {
      color: #3d5b98;
    }
  }
  &_main {
    display: flex;
    margin-top: 48rpx;
    &_img {
      width: 180rpx;
      height: 180rpx;
      border-radius: 20rpx;
      overflow: hidden;
    }
    &_text {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-left: 40rpx;
      &_tit {
        font-family: TsangerYuMo-3;
        line-height: 32rpx;
        font-size: 32rpx;
        // font-weight: bold;
        color: #000;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      &_sub {
        margin-top: 28rpx;
        font-size: 28rpx;
        color: #666;
      }
      &_tag {
        margin-top: 32rpx;
        color: #004e97;
        font-family: OPPOSans;
        font-size: 26rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 26rpx;
      }
    }
  }
  &_logistics {
    display: flex;
    align-items: center;
    margin-top: 40rpx;
    padding: 0 40rpx;
    line-height: 72rpx;
    font-size: 24rpx;
    border: 1px solid #e4f1ff;
    border-radius: 50px;
    background: #f8fbff;
    &_left {
      display: flex;
      align-items: center;
      color: #225497;
      font-weight: bold;
      font-family: OPPOSans;
      font-style: normal;
      font-weight: 400;
      text {
        margin-left: 16rpx;
      }
    }
    &_rigth {
      flex: 1;
      margin-left: 36rpx;
      color: #999;
    }
  }
}
</style>
