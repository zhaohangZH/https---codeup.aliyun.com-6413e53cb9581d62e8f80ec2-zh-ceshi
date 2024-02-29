<template>
  <uni-popup
    ref="popup"
    type="bottom"
    @change="(v) => emits('update:isshow', v.show)"
    :is-mask-click="false"
    :safe-area="false"
  >
    <view class="bc-address-list">
      <view class="bc-address-list-tit">
        <text class="bc-address-list-tit-name">收货地址</text>
        <text class="bc-address-list-tit-qx" @click="popup.close()">×</text>
      </view>
      <bc-my-address ref="myAddress" :fromType="1" @selectItem="selectItem"></bc-my-address
    ></view>
  </uni-popup>
</template>
<script setup>
import { ref, watch } from 'vue'
const emits = defineEmits(['update:isshow', 'successBtn', 'selectItem'])

const props = defineProps({
  isshow: {
    type: Boolean,
    default: false
  }
})

const popup = ref(null)
const myAddress = ref(null)

// 选择收货地址
const selectItem = (item) => {
  emits('selectItem', item)
  popup.value.close()
}

watch(
  () => props.isshow,
  (v) => {
    if (popup.value) {
      if (v) {
        myAddress.value.getAddressList()
        popup.value.open()
      } else {
        popup.value.close()
      }
    }
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
.bc-address-list {
  position: relative;
  background-color: #f6f6f6;
  padding: 100rpx 0 80rpx;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 68vh;
  border-radius: 32rpx 32rpx 0 0;

  &-tit {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30rpx 0;
    width: 100%;
    background-color: #fff;
    border-radius: 32rpx 32rpx 0 0;
    z-index: 99;
    &-qx {
      position: absolute;
      top: 14rpx;
      right: 30rpx;
      font-size: 50rpx;
    }
  }
}
</style>
