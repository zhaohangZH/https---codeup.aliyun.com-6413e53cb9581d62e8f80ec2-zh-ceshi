<template>
  <view style="position: relative; z-index: 999">
    <!-- @mask-click="emits('close')" -->
    <uni-popup
      ref="popup"
      type="center"
      :safe-area="false"
      :is-mask-click="false"
      mask-background-color="rgba(0,0,0,0.8)"
    >
      <!-- <view v-if="show"></view> -->
      <view v-if="status" class="popup-box">
        <view class="popup-head">重要提示</view>
        <view class="popup-body">
          <view class="popup-icon">
            <tc-image width="132rpx" height="132rpx" src="!@/selectrepay/i_05.png" />
          </view>
          <view class="popup-t1">报名名额已满，是否进入候补名单？</view>
          <view class="popup-t2">注意，进入候补名单后无法报名剩余场次</view>
          <view class="popup-btn" hover-class="hover-class" @click="emits('confirm')">
            确认进入候补名单
          </view>
          <view class="popup-t3" @click="emits('close')">报名其他场次</view>
        </view>
      </view>

      <!-- 报名确认中... -->
      <view v-else class="popup-box" style="padding-bottom: 60rpx">
        <view class="popup-head">报名确认中</view>
        <view class="popup-body">
          <view class="popup-icon">
            <tc-image width="132rpx" height="132rpx" src="!@/imgs/i_01.gif" />
          </view>
          <view class="popup-t1">报名确认中...</view>
          <view class="popup-t3">正在确认剩余报名名额</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
const emits = defineEmits(['close', 'confirm'])
const props = defineProps({
  show: {
    type: Boolean,
    default: () => false
  },
  status: {
    type: Number,
    default: 0
  }
})
const popup = ref(null)
watch(
  () => props.show,
  (v) => popupEvent(v)
)
const popupEvent = (show) => {
  if (!popup.value) return
  if (show) {
    popup.value.open()
  } else {
    popup.value.close()
  }
}
onMounted(() => nextTick(() => popupEvent(props.show)))
</script>

<style lang="scss" scoped>
.popup {
  &-box {
    width: 670rpx;
    background-color: #ffffff;
    border-radius: 40rpx;
  }
  &-head {
    height: 98rpx;
    padding: 0 40rpx;
    border-bottom: 2rpx solid #eee;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    font-size: 28rpx;
    color: #666666;
  }
  &-body {
    padding: 12rpx 40rpx;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 68rpx 0 80rpx;
  }

  &-t1 {
    font-size: 28rpx;
    font-weight: 400;
    color: #333333;
  }
  &-t2 {
    margin-top: 20rpx;
    font-size: 24rpx;
    font-weight: 400;
    text-align: center;
    color: #c72626;
  }
  &-t3 {
    margin-bottom: 18rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #666666;
    line-height: 60rpx;
  }
  &-btn {
    width: 526rpx;
    height: 96rpx;
    margin: 60rpx 0 30rpx;
    background: linear-gradient(180deg, #5f8aff, #3d55c3);
    border: 2rpx solid #9eb5ea;
    border-radius: 50rpx;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 30rpx;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
