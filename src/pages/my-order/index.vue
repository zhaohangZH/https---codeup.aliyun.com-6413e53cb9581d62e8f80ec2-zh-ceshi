<template>
  <view>
    <z-paging-swiper swiper-style="background: #fff;">
      <template #top>
        <bc-navbar
          title="订单详情"
          :type="4"
          :custom-style="{ backgroundColor: '#fff' }"
          :share="false"
        />
        <view class="flex-row items-center order_top">
          <view class="flex-row justify-center flex-1 order_top_btn" :class="{ active: ani == 0 }">
            <view class="order_top_btn_box" @click="ani = 0">
              <text>待发货</text>
              <view v-if="ani == 0" class="order_top_btn_bj">
                <tc-image src="!@/imgs/i_04.png" width="28" height="24" mode="widthFix" />
              </view>
            </view>
          </view>
          <view class="flex-row justify-center flex-1 order_top_btn" :class="{ active: ani == 1 }">
            <view class="order_top_btn_box" @click="ani = 1">
              <text>已发货</text>
              <view v-if="ani == 1" class="order_top_btn_bj">
                <tc-image src="!@/imgs/i_04.png" width="28" height="24" mode="widthFix" />
              </view>
            </view>
          </view>
          <view class="flex-row justify-center flex-1 order_top_btn" :class="{ active: ani == 2 }">
            <view class="order_top_btn_box" @click="ani = 2">
              <text>已完成</text>
              <view v-if="ani == 2" class="order_top_btn_bj">
                <tc-image src="!@/imgs/i_04.png" width="28" height="24" mode="widthFix" />
              </view>
            </view>
          </view>
        </view>
      </template>
      <swiper
        class="swiper"
        :current="ani"
        @transition="swiperTransition"
        @animationfinish="swiperAnimationfinish"
      >
        <swiper-item v-for="(item, index) in 3" :key="index" class="swiper-item">
          <orderBox :type="ani + 1" :typeIndex="index" @qrShow="qrShow" />
        </swiper-item>
      </swiper>
    </z-paging-swiper>
  </view>
  <bc-qrcode-box
    :id="showQrcodeId"
    class="qrcode-popup"
    :show="showQrcodePopup"
    type="10001"
    @close="showQrcodePopup = false"
  />
</template>
<script setup>
import orderBox from './components/order-box'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
const emits = defineEmits(['onNav'])
// 默认类型
const ani = ref(0)
onLoad((option) => {
  ani.value = option.id - 1
})
//swiper滑动结束
const swiperAnimationfinish = (e) => {
  ani.value = e.detail.current
}
//显示二维码
const showQrcodePopup = ref(false)
const showQrcodeId = ref('')
const qrShow = (orderId) => {
  showQrcodePopup.value = true
  showQrcodeId.value = orderId
}
</script>
<style lang="scss" scoped>
.order {
  &_top {
    padding: 0 40rpx;
    background: #fff;
    &_btn {
      line-height: 116rpx;
      color: #666;
      font-size: 30rpx;
      font-style: normal;
      font-weight: 400;
      &_box {
        position: relative;
        padding: 0 20rpx;
        text {
          position: relative;
          z-index: 2;
        }
      }
      &_bj {
        position: absolute;
        right: 4rpx;
        bottom: 32rpx;
        z-index: 1;
      }
      &.active {
        color: #225497;
        font-size: 32rpx;
      }
    }
  }
}
.swiper {
  // margin-top: 52rpx;
  height: calc(100vh - 62px);
  padding-bottom: 0;
  padding-bottom: calc(constant(safe-area-inset-bottom));
  padding-bottom: calc(env(safe-area-inset-bottom));
}
</style>
