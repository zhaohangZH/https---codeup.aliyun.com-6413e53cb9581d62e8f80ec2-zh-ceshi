<template>
  <bc-navbar
    :type="4"
    title="核销结果"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <view
    v-for="item in payDetails"
    :key="item.id"
    class="verification_result flex-col justify-cente items-center"
  >
    <tc-image width="350rpx" height="350rpx" :src="item.imageUrl" />
    <view class="verification_result_name mar-top-48">{{ item.name }} </view>
    <view class="verification_result_type mar-top-48 flex-col items-center"
      ><text v-for="it in item.spec.split(',')" :key="it">{{ it }}</text></view
    >
  </view>
  <view class="verification_result_btnBox flex-row justify-between">
    <view class="verification_result_btn flex-row justify-center items-center" @click="goBack"
      >返回</view
    >
    <view
      class="verification_result_btn active flex-row justify-center items-center"
      @click="toScan"
      >继续扫码</view
    >
  </view>
</template>
<script setup>
import { getPayWriteOff } from '@/api/order'
import { useScanCode } from '@/hooks/useScanCode'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
const toScan = async () => {
  const [err, res] = await useScanCode()
  if (!err && res.params.id) {
    getPayWriteOffs(res.params.id)
  } else {
    payDetails.value = {}
  }
}
onLoad((option) => {
  getPayWriteOffs(option.id)
})
const payDetails = ref({})
const getPayWriteOffs = async (id) => {
  const [err, res] = await getPayWriteOff({ id: id })
  if (!err) {
    payDetails.value = res.result.payOrderDetails
  }
}
const goBack = () => uni.navigateBack({ delta: 1 })
</script>
<style lang="scss" scoped>
.verification_result {
  padding: 80rpx 40rpx;
  margin: 32rpx 32rpx;
  border-radius: 32rpx;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
  background: #fff;
  &_name {
    font-size: 32rpx;
  }
  &_type {
    font-size: 60rpx;
    font-weight: bold;
    color: #1a377f;
    text {
      line-height: 80rpx;
    }
  }
  .mar-top-48 {
    margin-top: 48rpx;
  }
  &_btnBox {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    box-sizing: border-box;
    padding: 22rpx 48rpx;
    background: #fff;
  }
  &_btn {
    width: 140rpx;
    height: 96rpx;
    font-size: 28rpx;
    color: #aaa;
    font-weight: bold;
    &.active {
      width: 470rpx;
      border-radius: 50px;
      border: #9eb5ea 2rpx solid;
      font-size: 30rpx;
      color: #fff;
      font-weight: bold;
      background-image: linear-gradient(180deg, #5f8aff 0%, #3d55c3 100%);
    }
  }
}
</style>
