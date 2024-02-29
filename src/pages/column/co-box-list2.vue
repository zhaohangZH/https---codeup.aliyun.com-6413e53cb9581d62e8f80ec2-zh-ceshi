<template>
  <view class="box_li2">
    <view class="flex-row items-center">
      <tc-image width="44rpx" height="44rpx" :src="item.logoUrl" />
      <view class="box_li2_title flex-col">
        <view>{{ item.name }}</view>
        <text>{{ item.currentTime }}</text>
      </view>
    </view>
    <view class="box_li2_imgs flex-row">
      <view
        v-for="(it, index) in item.files"
        :key="it.id"
        class="box_li2_imgs_img"
        @click="topImg(index)"
      >
        <tc-image width="144rpx" height="144rpx" mode="aspectFill" :src="it.smallFilePath" />
      </view>
      <view
        v-if="item.isMore"
        class="box_li2_imgs_img flex-col items-center justify-center"
        style="background: #ededed"
        @click="gotoPhoto"
      >
        <tc-image width="28rpx" height="28rpx" mode="aspectFill" src="!@/column/icon_01.png" />
        <view class="box_li2_imgs_img_text"
          ><text>查看更多</text
          ><tc-image width="6rpx" height="11rpx" mode="widthFix" src="!@/policy/left.png"
        /></view>
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    default() {
      return {}
    }
  }
})

// 浏览图片列表
const filePathList = ref([])
// 浏览模式
const topImg = (i) => {
  if (!filePathList.value.length) {
    props.item.files.map((item) => {
      filePathList.value.push(item.filePath)
    })
  }
  uni.previewImage({
    current: i,
    urls: filePathList.value
  })
}
const gotoPhoto = () => {
  uni.navigateTo({ url: 'pages/column/photo?id=' + props.item.id })
}
</script>
<style lang="scss" scoped>
.box_li2 {
  margin-top: 24rpx;
  padding: 32rpx 32rpx;
  border-radius: 28rpx;
  background: #f9f9f9;
  &_title {
    margin-left: 24rpx;
    line-height: 34rpx;
    view {
      font-size: 24rpx;
      color: #333;
    }
    text {
      font-size: 20rpx;
      color: #aaa;
    }
  }
  &_imgs {
    flex-wrap: wrap;
    margin-top: 26rpx;
    width: 606rpx;
    &_img {
      margin-top: 10rpx;
      margin-right: 10rpx;
      width: 144rpx;
      height: 144rpx;
      &:nth-child(4n) {
        margin-right: 0;
      }
      &_text {
        margin-top: 12rpx;
        font-size: 16rpx;
        color: #666;
        text {
          margin-right: 7rpx;
        }
      }
    }
  }
}
</style>
