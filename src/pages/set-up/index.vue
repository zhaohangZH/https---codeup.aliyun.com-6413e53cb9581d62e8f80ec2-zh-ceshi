<template>
  <bc-navbar
    title="安全设置"
    :type="4"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <view class="setUp">
    <view>新活动通知</view>
    <view>
      <switch
        :checked="isDefault"
        disabled
        @click="switchChange"
        color="#3567CB"
        style="transform: scale(0.5)"
      ></switch>
    </view>
  </view>
</template>
<script setup>
import { ref } from 'vue'
const isDefault = ref(true)
const switchChange = () => {
  wx.requestSubscribeMessage({
    tmplIds: ['_CZ9dmrzvdxrsjSgIVNjeM83QKcFruc3QvH1feUX_yE'],
    success(res) {
      // console.log(res)
      isDefault.value = res._CZ9dmrzvdxrsjSgIVNjeM83QKcFruc3QvH1feUX_yE == 'accept' ? true : false
    }
  })
}
</script>
<style lang="scss" scoped>
.setUp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32rpx 40rpx;
  padding: 40rpx 0 40rpx 40rpx;
  height: 28rpx;
  font-size: 28rpx;
  border-radius: 20rpx;
  background: #fff;
}
</style>
