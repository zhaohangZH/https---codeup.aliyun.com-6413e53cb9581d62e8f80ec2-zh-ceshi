<template>
  <view class="column-vote_box_item">
    <view class="column-vote_box_item_top flex-row justify-between items-center">
      <view class="column-vote_box_item_top_l flex-row items-center"
        >NO.{{ item.signNum }} <text>{{ item.gameType }}</text></view
      >
      <view class="column-vote_box_item_top_r flex-row items-center"
        ><tc-image width="24rpx" height="24rpx" src="!@/column/icon_08.png" /><text>{{
          item.popularityNum
        }}</text></view
      >
    </view>
    <view class="column-vote_box_item_title">{{ item.projectName }}</view>
    <view class="column-vote_box_item_tag">
      <view class="flex-row items-center"
        >依托单位：<view class="column-vote_box_item_tag_text"
          ><tc-image width="24rpx" height="24rpx" :src="item.logoUrl" mode="heightFix" /></view
      ></view>
    </view>
    <view class="column-vote_box_item_tag flex-row justify-between items-center">
      <view
        >团队队长：<text class="column-vote_box_item_tag_text">{{ item.name }}</text></view
      >
      <view
        >指导教师：<text class="column-vote_box_item_tag_text">{{ item.teacherName }}</text></view
      >
    </view>
    <view class="column-vote_box_item_btn flex-row justify-between items-center">
      <view class="column-vote_box_item_btns flex-row items-center" @click="toSelect"
        ><tc-image width="24rpx" height="24rpx" src="!@/column/icon_09.png" /><text
          >了解项目</text
        ></view
      >
      <view class="column-vote_box_item_btns active flex-row items-center" @click="addPopularitys"
        ><tc-image width="24rpx" height="24rpx" src="!@/column/icon_10.png" /><text
          >支持项目</text
        ></view
      >
    </view>
  </view>
</template>
<script setup>
import { addPopularity } from '@/api/game'

const emits = defineEmits(['addNum'])
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  },
  index: {
    type: Number,
    default: 0
  }
})

// 点赞
const addPopularitys = async () => {
  const [err, res] = await addPopularity({ id: props.item.id })
  if (!err) {
    emits('addNum', props.index)
  }
}

// 查看文档
const toSelect = () => {
  if (!props.item.filePath) return
  wx.downloadFile({
    url: props.item.filePath,
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
}
</script>
<style lang="scss" scoped>
.column-vote_box_item {
  margin-top: 28rpx;
  padding: 36rpx 40rpx;
  color: #333;
  background-color: #f9f9f9;
  border-radius: 20rpx;
  &_top {
    &_l {
      font-size: 32rpx;
      color: #1a377f;
      font-weight: bold;
      text {
        padding: 0 8rpx;
        margin-left: 12rpx;
        line-height: 28rpx;
        font-size: 16rpx;
        color: #fff;
        border-radius: 6rpx;
        background: #e7a754;
      }
    }
    &_r {
      text {
        margin-left: 8rpx;
        font-size: 22rpx;
        color: #d14d4d;
      }
    }
  }
  &_title {
    margin-bottom: 28rpx;
    margin-top: 38rpx;
    line-height: 32rpx;
    font-size: 28rpx;
    color: #333;
    font-weight: bold;
  }
  &_tag {
    line-height: 64rpx;
    font-size: 24rpx;
    color: #999;
    &_text {
      margin-left: 40rpx;
      color: #333;
    }
  }
  &_btn {
    margin-top: 24rpx;
    line-height: 68rpx;
    &s {
      padding: 0 56rpx;
      font-size: 24rpx;
      border-radius: 50px;
      text-align: center;
      border: 4rpx solid #cacaca;
      color: #666666;
      background: #fff;
      text {
        margin-left: 16rpx;
      }
      &.active {
        color: #3567cb;
        border-color: #9fb1d3;
        background: #f6f8fc;
      }
    }
  }
}
</style>
