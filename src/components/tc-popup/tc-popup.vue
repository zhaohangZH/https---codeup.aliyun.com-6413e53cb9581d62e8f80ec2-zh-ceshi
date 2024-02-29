<template>
  <uni-popup
    ref="popup"
    type="center"
    :is-mask-click="false"
    @change="(v) => emits('update:isshow', v.show)"
  >
    <view class="flex-col section_2">
      <view class="image_2">
        <tc-image width="192" height="192" src="!@/selectrepay/i_01.png" />
      </view>
      <text class="text">重要提示</text>
      <text v-if="title" class="self-center font_1 text_2">{{ title }}</text>
      <slot name="title"></slot>
      <view class="flex-col group space-y-23">
        <view class="flex-col justify-start items-center button" @click="submit"
          ><text class="font_1 text_3">确认选择</text></view
        >

        <view
          class="flex-col justify-start items-center button active"
          @click="emits('update:isshow', false)"
        >
          <text class="self-center font_1">在想想</text>
        </view>
      </view>
      <view class="image_3">
        <tc-image width="590" height="192" src="!@/selectrepay/i_02.png" mode="widthFix" />
      </view>
    </view>
  </uni-popup>
</template>

<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['update:isshow', 'submitBtn'])
const props = defineProps({
  isshow: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  titleHtml: {
    type: String,
    default: ''
  }
})
const popup = ref(null)
const submit = () => {
  emits('submitBtn')
}
watch(
  () => props.isshow,
  (v) => {
    if (popup.value) {
      if (v) {
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

<style scoped lang="scss">
.section_2 {
  position: relative;
  padding: 60rpx 60rpx;
  width: 590rpx;
  background-color: #ffffff;
  border-radius: 40rpx;
  box-sizing: border-box;
  .font_1 {
    font-size: 28rpx;
    line-height: 36rpx;
    color: #666666;
  }
  .text {
    font-size: 32rpx;
    color: #000;
    font-weight: 400;
  }
  .divider {
    margin-top: 30rpx;
    background-color: #eeeeee;
    height: 2rpx;
  }
  .image_2 {
    position: absolute;
    top: -60rpx;
    right: 0;
  }
  .image_3 {
    position: absolute;
    left: 0;
    bottom: -42rpx;
  }
  .text_2 {
    margin-top: 72rpx;
    color: #333333;
    line-height: 48rpx;
    text-align: justify;
  }
  .group {
    margin-top: 68rpx;
    .button {
      padding: 28rpx 0;
      border-radius: 50px;
      border: 2rpx solid #76b4fd;
      background: #2265b3;
      .text_3 {
        color: #ffffff;
        font-size: 28rpx;
        line-height: 38rpx;
      }
      &.active {
        border-color: #e4f1ff;
        background: #f8fbff;
        color: #666;
      }
    }
  }
  .space-y-23 {
    & > view:not(:first-child),
    & > text:not(:first-child),
    & > image:not(:first-child) {
      margin-top: 46rpx;
    }
  }
}
</style>
