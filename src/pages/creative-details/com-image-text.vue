<template>
  <view class="com-card">
    <tc-image width="160" height="28" src="!@/icons/i71.png" />
    <view style="margin-top: 40rpx">
      <rich-text :nodes="nodes"></rich-text>
    </view>
  </view>
</template>
<script setup>
import { computed } from 'vue'
import parseHtml from '@/utils/html-parser'
const props = defineProps({
  info: {
    type: String,
    default: ''
  }
})
const nodes = computed(() => parseHtml(props.info))
</script>
<style lang="scss" scoped>
.com-card {
  margin: 0 24rpx 24rpx;
  padding: 40rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.06);
}
</style>
