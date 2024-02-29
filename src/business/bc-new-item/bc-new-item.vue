<template>
  <view v-if="item.id" class="new_item" hover-class="hover-class" @click="toSelect">
    <view class="flex-row new_item_item">
      <view class="flex-col justify-center flex-1 new_item_item_text">
        <view class="new_item_item_text_name">
          {{ item.title }}
        </view>
        <text class="new_item_item_text_names">{{ item.releaseDate }}</text>
        <view class="flex-row items-center new_item_item_text_names">
          <tc-image width="20" height="20" src="!@/imgs/i_03.png" mode="widthFix" />
          <text class="tc-line-1">{{ item.recDate }}</text>
        </view>
      </view>
      <view><tc-image width="160" height="160" radius="32" :src="item.coverImage" /></view>
    </view>
  </view>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})

const toSelect = () => {
  const item = props.item
  if (item.fileType == 1) {
    wx.downloadFile({
      url: item.pdfUrl,
      success: function (res) {
        if (res.statusCode === 200) {
          const filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              wx.hideLoading()
              // console.log('打开文档成功')
            }
          })
        } else {
          wx.showToast({
            title: '打开失败',
            icon: 'none'
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '打开失败',
          icon: 'none'
        })
      }
    }).onProgressUpdate((res) => {
      wx.showLoading({
        title: `正在打开${res.progress}%...`,
        mask: true
      })
    })
  } else {
    uni.navigateTo({ url: `pages/news-details/index?id=${item.id}` })
  }
}
</script>
<style lang="scss" scoped>
.new_item {
  padding: 48rpx 0;
  border-bottom: 2rpx solid #eee;
  &_item {
    &_text {
      margin-right: 32rpx;
      &_name {
        margin-top: 16rpx;
        color: #000;
        font-size: 28rpx;
      }
      &_names {
        margin-top: 24rpx;
        color: #aaa;
        font-size: 22rpx;
        text {
          margin-left: 12rpx;
        }
      }
    }
  }
  &:last-of-type {
    border: none;
  }
}
</style>
