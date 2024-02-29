<template>
  <view class="com-card">
    <view class="flex-row items-center com-card-title">
      <tc-image width="30" height="32" src="!@/imgs/icon-logo-b.png" mode="widthFix" />
      <text>{{ popupInfo.isLove ? '项目详情' : '回馈详情' }}</text>
    </view>
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
  },
  popupInfo: {
    type: Object,
    default: () => ({})
  }
})
const nodes = computed(() => parseHtml(props.info))
</script>
<style lang="scss" scoped>
.com-card {
  padding: 0 40rpx 40rpx;
  &-title {
    text {
      margin-left: 24rpx;
      color: #333;
      font-size: 36rpx;
      font-weight: 400;
    }
  }
}
</style>
