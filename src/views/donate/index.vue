<template>
  <view class="creative">
    <z-paging-swiper swiper-style="background: #fff;">
      <template #top>
        <bc-navbar
          :type="1"
          :share="false"
          :placeholder="true"
          :custom-style="{ boxShadow: 'none', backgroundColor: '#fff' }"
        >
          <template #img><bc-logo color="#004E97" /></template>
        </bc-navbar>
        <view class="flex-row items-center creative_top">
          <view
            class="flex-row justify-center flex-1 creative_top_btn"
            :class="{ active: opType == 0 }"
          >
            <view class="creative_top_btn_box" @click="opType = 0">
              <text>公益活动</text>
              <view v-if="opType == 0" class="creative_top_btn_bj">
                <tc-image src="!@/imgs/i_04.png" width="28" height="24" mode="widthFix" />
              </view>
            </view>
          </view>
          <view
            class="flex-row justify-center flex-1 creative_top_btn"
            :class="{ active: opType == 1 }"
          >
            <view class="creative_top_btn_box" @click="opType = 1">
              <text>最新消息</text>
              <view v-if="opType == 1" class="creative_top_btn_bj">
                <tc-image src="!@/imgs/i_04.png" width="28" height="24" mode="widthFix" />
              </view>
            </view>
          </view>
        </view>
      </template>
      <swiper
        class="swiper"
        :current="opType"
        @transition="swiperTransition"
        @animationfinish="swiperAnimationfinish"
      >
        <swiper-item class="swiper-item">
          <campaign :type="opType + 1" :typeIndex="0" />
        </swiper-item>
        <swiper-item class="swiper-item">
          <mynew :type="opType + 1" :typeIndex="1" />
        </swiper-item>
      </swiper>
      <template #bottom><bc-tabbar :placeholder="true" /></template>
    </z-paging-swiper>
  </view>
</template>
<script setup>
import { ref } from 'vue'
import { campaign } from './campaign.vue'
import { mynew } from './new.vue'
import { onShow, onHide, onUnload } from '@dcloudio/uni-app'
import { useDonateStore } from '@/store/donate'
const opType = ref(0)
//swiper滑动结束
const swiperAnimationfinish = (e) => {
  opType.value = e.detail.current
}
onShow(() => {
  opType.value = useDonateStore().activeTab
})
onUnload(() => {
  useDonateStore().setActiveTab(opType.value)
})
onHide(() => {
  useDonateStore().setActiveTab(opType.value)
})
</script>
<style lang="scss" scoped>
.creative {
  &_top {
    position: relative;
    padding: 0 40rpx;
    background: #fff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
    z-index: 998;
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
  height: 100%;
}
</style>
