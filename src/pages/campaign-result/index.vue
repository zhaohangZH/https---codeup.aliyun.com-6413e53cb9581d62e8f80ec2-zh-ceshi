<template>
  <bc-navbar title="" :type="3" :custom-style="{ backgroundColor: '#fff' }" :share="false" />
  <view v-if="activityInfo.id" class="campaign-result">
    <view class="result">
      <template v-if="activityInfo.signUpStatus === 1">
        <tc-image width="160" height="160" src="!@/imgs/i_21.png" />
        <text class="result-t1">活动报名成功，期待您的准时参加!</text>
        <!-- <text class="result-t2">恭喜您报名成功，请不要忘记准时参加活动哦~</text> -->
      </template>
      <template v-else-if="activityInfo.signUpStatus === 3">
        <tc-image width="160" height="160" src="!@/imgs/i_21.png" />
        <text class="result-t1">报名名额已满，您已进入候补队列，请等待通知!</text>
        <!-- <text class="result-t2">当前报名名额已满，您已进入候补队列，请等待通知~</text> -->
      </template>
      <template v-else-if="activityInfo.signUpStatus === 5">
        <tc-image width="160" height="160" src="!@/imgs/i_21.png" />
        <text class="result-t1">本活动已成功签到!</text>
        <!-- <text class="result-t2">恭喜您，本活动已成功签到~</text> -->
      </template>
    </view>
    <view class="result_box">
      <view class="flex-row items-center result_box_title">
        <tc-image width="24" height="24" src="!@/imgs/i_30.png" />
        <text class="result_box_title_text">报名信息</text>
      </view>
      <bc-campaign-item :info="activityInfo" />
    </view>
  </view>
  <tc-tabbar :z-index="5">
    <view
      class="flex-col justify-start items-center button"
      hover-class="hover-class"
      @click="goHome"
      >返回首页</view
    >
  </tc-tabbar>
</template>

<script setup>
import { ref, onMounted /*, computed*/ } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import { getSignUpResult } from '@/api/activity.js'

let pageId = ''
onLoad((ops) => (pageId = ops.id))

const activityInfo = ref({})

// const activityStatus = computed(() => {
//   return activityInfo.value.signUpStatus === 1
//     ? '报名'
//     : activityInfo.value.signUpStatus === 3
//     ? '候补'
//     : ''
// })
onMounted(async () => {
  const [err, res] = await getSignUpResult({ id: pageId })
  if (!err) {
    const { result = {} } = res
    activityInfo.value = result
  }
})

const goHome = () => uni.switchTab({ url: 'views/home/index' })
</script>

<style lang="scss" scoped>
.campaign-result {
  .result {
    padding: 60rpx 0 80rpx;
    background-color: #ffffff;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &-t1 {
      margin-top: 40rpx;
      font-size: 30rpx;
      font-weight: 600;
      color: #333;
    }
    &-t2 {
      font-size: 24rpx;
      font-weight: 400;
      color: #aaaaaa;
    }
  }
  .result_box {
    margin-top: 20rpx;
    padding: 40rpx 40rpx 52rpx;
    background: #fff;
    &_title {
      &_text {
        margin-left: 20rpx;
        font-size: 28rpx;
        color: #000;
      }
    }
  }
}
.button {
  margin: 20rpx auto;
  width: calc(100% - 64rpx);

  line-height: 96rpx;
  border-radius: 20rpx;
  background: #225497;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  font-size: 30rpx;
  font-weight: 400;
  color: #ffffff;
}
</style>
