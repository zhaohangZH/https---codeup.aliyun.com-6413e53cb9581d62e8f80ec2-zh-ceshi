<template>
  <view class="my_content_fun_order">
    <view class="my_content_fun_order_li" hover-class="hover-class" @click="aboutFun(1)">
      <view class="my_content_fun_order_li_img">
        <text>
          {{ handleCount(userCounts.unDeliverGoodsCount) }}
        </text>
        <!-- <tc-image src="!@/my/order_01.png" width="42" height="42" mode="widthFix" /> -->
      </view>
      <text class="my_content_fun_order_li_text">待发货</text>
    </view>
    <view class="my_content_fun_order_li" hover-class="hover-class" @click="aboutFun(2)">
      <view class="my_content_fun_order_li_img">
        <text>
          {{ handleCount(userCounts.deliverGoodsCount) }}
        </text>
        <!-- <tc-image src="!@/my/order_02.png" width="42" height="42" mode="widthFix" /> -->
      </view>
      <text class="my_content_fun_order_li_text">已发货</text>
    </view>
    <view class="my_content_fun_order_li" hover-class="hover-class" @click="aboutFun(3)">
      <view class="my_content_fun_order_li_img">
        <text>
          {{ handleCount(userCounts.receiptGoodsCount) }}
        </text>
        <!-- <tc-image src="!@/my/order_03.png" width="42" height="42" mode="widthFix" /> -->
      </view>
      <text class="my_content_fun_order_li_text">已完成</text>
    </view>
  </view>
</template>
<script setup>
defineProps({
  userCounts: {
    type: Object,
    default: () => ({})
  }
})
const aboutFun = (str) => {
  uni.navigateTo({
    url: '/pages/my-order/index?id=' + str
  })
}
const handleCount = (n) => (n ? (n > 99 ? '99+' : n) : '-')
</script>
<style lang="scss" scoped>
.my_content_fun_order {
  display: flex;
  padding: 52rpx 48rpx 72rpx;
  &_li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    flex: 1;
    font-size: 24rpx;
    height: 84rpx;
    &_img {
      position: relative;
      text {
        font-size: 36rpx;
        line-height: 36rpx;
        font-weight: bold;
        color: #000;
      }
    }
    &_text {
      margin-top: 12rpx;
      color: #666;
    }
  }
}
</style>
