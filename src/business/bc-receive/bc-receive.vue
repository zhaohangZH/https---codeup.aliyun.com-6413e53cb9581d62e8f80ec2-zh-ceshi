<template>
  <view class="bc-receive" @click.prevent>
    <view class="bc-receive_title">是否需要现场领取？</view>
    <view class="bc-receive_btnBox flex-row">
      <view
        v-for="item in receiveTypes"
        :key="item.value"
        class="bc-receive_btn flex-row items-center"
        :class="{ active: opType == item.value }"
        @click.prevent="typeFun(item.value)"
        >{{ item.text }}</view
      >
    </view>

    <tc-popup
      v-model:isshow="isshow"
      title="如果您选择了邮寄地址，本次回馈品将无法现场领取，请谨慎选择！"
      @submit-btn="successFun"
    ></tc-popup>
  </view>
</template>
<script setup>
import { ref } from 'vue'

const isshow = ref(false)
const props = defineProps({
  receiveTypes: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['successBtn'])

// 切换
const opType = ref('')
const typeFun = (n) => {
  if (opType.value == n) return
  if (n == 1) {
    isshow.value = true
  } else {
    opType.value = n
    emits('successBtn', n)
  }
}

// 传回父
const successFun = () => {
  opType.value = 1
  emits('successBtn', 1)
  isshow.value = false
}
</script>
<style lang="scss" scoped>
.bc-receive {
  margin-top: 48rpx;
  padding-top: 48rpx;
  border-top: 2rpx solid #eee;
  &_title {
    font-size: 26rpx;
    color: #333;
  }
  &_btnBox {
    margin-top: 32rpx;
    margin-left: -36rpx;
  }
  &_btn {
    margin-left: 36rpx;
    margin-bottom: 4rpx;
    padding: 22rpx 30rpx;
    border-radius: 50px;
    // width: 108rpx;
    line-height: 26rpx;
    font-weight: 400;
    font-size: 26rpx;
    border: 2rpx solid #e4f1ff;
    background-color: #f8fbff;
    color: #666666;
    &.active {
      border-color: #225497;
      background-color: #225497;
      color: #fff;
    }
  }
}
</style>
