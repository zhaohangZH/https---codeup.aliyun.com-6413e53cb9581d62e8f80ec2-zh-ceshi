<template>
  <view class="com-bd">
    <swiper class="com-bd-swiper" autoplay circular>
      <swiper-item v-for="item in info" :key="item">
        <view style="display: flex; width: 100%; height: 100%">
          <tc-image width="100%" height="100%" :src="item" />
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script setup>
defineProps({
  info: {
    type: Array,
    default: () => []
  }
})
</script>
<style lang="scss" scoped>
.com-bd {
  position: relative;
  &-swiper {
    width: 750rpx;
    height: 360rpx;
  }
}
</style>
