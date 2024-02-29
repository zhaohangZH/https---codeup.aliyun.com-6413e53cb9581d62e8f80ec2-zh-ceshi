<template>
  <uni-popup
    ref="popup"
    type="center"
    :safe-area="false"
    :is-mask-click="false"
    mask-background-color="rgba(0,0,0,0.8)"
    @mask-click="emits('close')"
  >
    <view class="qrcode-box">
      <view class="qrcode-box-close" @click="emits('close')">
        <tc-image width="20rpx" height="20rpx" src="!@/icons/i31.png" />
      </view>
      <tc-image
        width="600rpx"
        height="auto"
        mode="widthFix"
        :show-menu-by-longpress="true"
        :src="url"
      />
    </view>
  </uni-popup>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
const emits = defineEmits(['close'])
const props = defineProps({
  show: {
    type: Boolean,
    default: () => false
  },
  url: {
    type: String,
    default: () => ''
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
onMounted(() =>
  nextTick(() => {
    popupEvent(props.show)
  })
)
</script>

<style lang="scss" scoped>
.qrcode-box {
  display: flex;
  padding: 24rpx;
  border-radius: 20rpx;
  background-color: #fff;
  position: relative;
  &-close {
    padding: 40rpx;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
</style>
