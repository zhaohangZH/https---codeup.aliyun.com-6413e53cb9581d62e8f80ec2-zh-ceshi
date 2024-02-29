<template>
  <view class="column-details-brief">
    <view class="column-details-brief_title flex-row justify-between">
      <view class="column-details-brief_title_left flex-row items-center"
        ><tc-image width="28" height="28" src="!@/column/icon_05.png" /><text>报名事项</text></view
      >
      <view class="column-details-brief_title_right flex-row items-center" @click="popup.open()"
        ><tc-image width="20" height="20" src="!@/column/icon_11.png" /><text>下载指引</text></view
      >
    </view>
    <!-- <view class="column-details-brief_box flex-row justify-between">
      <view class="column-details-brief_box_li flex-col items-center">
        <text>团队</text>
        <text>组别形式</text>
      </view>
      <view class="column-details-brief_box_li flex-col items-center">
        <text>10</text>
        <text>最大人数</text>
      </view>
      <view class="column-details-brief_box_li flex-col items-center">
        <text>1项</text>
        <text>报名限制</text>
      </view>
    </view> -->
    <view class="column-details-brief_box"
      ><mp-html :content="info.teamDescription" space="nbsp" :preview-img="false"
    /></view>
    <view
      class="column-details-brief_annex flex-row"
      v-for="(item, index) in info.gameFileModels"
      :key="index"
    >
      <view class="column-details-brief_annex_icon flex-row justify-center items-center"
        ><tc-image
          :src="'!@/icons/' + fileIconFun(item.filePath) + '.png'"
          width="50"
          height="64"
          mode="widthFix"
      /></view>
      <view
        class="column-details-brief_annex_box flex-col"
        @click="shareFile(item.filePath, item.fileName)"
      >
        <view class="column-details-brief_annex_box_tit flex-row justify-between">
          <text>附件</text>
          <text>点击发送到电脑</text>
        </view>
        <view class="column-details-brief_annex_box_text">{{ item.fileName }}</view>
      </view>
    </view>
    <view class="column-details-brief_final flex-row">
      <text class="column-details-brief_final_name">参赛范围：</text>
      <view class="column-details-brief_final_text">
        <mp-html :content="info.scope" space="nbsp"
      /></view>
    </view>
  </view>
  <!-- 普通弹窗 -->
  <uni-popup ref="popup" type="bottom" :is-mask-click="true">
    <view class="column-details-brief_popup flex-col">
      <view class="column-details-brief_popup_tit">
        <text class="column-details-brief_popup_tit_name">下载指引</text>
        <text class="column-details-brief_popup_tit_qx" @click="popup.close()">×</text>
      </view>
      <view class="column-details-brief_popup_main">
        <tc-image
          width="100%"
          height="auto"
          mode="widthFix"
          :show-menu-by-longpress="true"
          src="!@/hint/download.jpg"
        />
      </view> </view
  ></uni-popup>
</template>
<script setup>
import { shareFile, fileIconFun } from '@/utils/shareFun'
import { ref } from 'vue'
defineProps({
  info: {
    type: String,
    default: ''
  }
})
// 下载指引
const popup = ref(null)
</script>
<style lang="scss" scoped>
.column-details-brief {
  margin: 24rpx;
  padding: 32rpx 40rpx;
  color: #333;
  background-color: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.06);
  &_title {
    padding: 0 0 32rpx;
    border-bottom: 2rpx solid #f6f6f6;
    &_left {
      font-size: 28rpx;
      text {
        margin: 0 16rpx;
        font-weight: bold;
      }
    }
    &_right {
      padding: 0 16rpx;
      line-height: 40rpx;
      font-size: 18rpx;
      color: #3567cb;
      border-radius: 50px;
      background: #edf2ff;
      text {
        margin-left: 6rpx;
      }
    }
  }
  &_box {
    margin-top: 32rpx;
    border-radius: 24rpx;
    // background: #f9f9f9;
    &_li {
      flex: 1;
      padding: 44rpx 0;
      text:nth-child(1) {
        font-size: 34rpx;
        font-weight: bold;
      }
      text:nth-child(2) {
        margin-top: 22rpx;
        font-size: 22rpx;
        color: #666;
      }
    }
  }
  &_annex {
    margin-top: 24rpx;
    padding: 28rpx 40rpx;
    border-radius: 24rpx;
    background: #f9f9f9;
    &_icon {
      width: 104rpx;
      height: 104rpx;
      border-radius: 24rpx;
      background: #e9edf7;
    }
    &_box {
      flex: 1;
      margin-left: 28rpx;
      font-size: 20rpx;
      &_tit {
        text:nth-child(1) {
          font-weight: bold;
        }
        text:nth-child(2) {
          color: #3567cb;
        }
      }
      &_text {
        margin-top: 12rpx;
        line-height: 36rpx;
      }
    }
  }
  &_final {
    margin-top: 32rpx;
    line-height: 48rpx;
    font-size: 24rpx;
    &_name {
      color: #999;
    }
    &_text {
      flex: 1;
      margin-left: 48rpx;
      color: #3567cb;
      font-weight: bold;
    }
  }
}
.column-details-brief_popup {
  padding: 24rpx;
  height: 80vh;
  border-radius: 20rpx;
  background-color: #fff;
  &_tit {
    width: calc(100% - 20rpx);
    display: flex;
    justify-content: space-between;
    padding: 20rpx 0;
    box-sizing: border-box;
    &_name {
      text-align: center;
    }
    &_qx {
      font-size: 50rpx;
    }
  }
  &_main {
    overflow-x: scroll;
  }
}
</style>
