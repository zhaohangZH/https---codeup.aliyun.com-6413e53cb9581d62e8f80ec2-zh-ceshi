<template>
  <bc-navbar
    title="认证结果"
    :type="4"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <view class="flex-col page">
    <view class="flex-col flex-auto group_3 space-y-255">
      <view class="flex-col group_4 space-y-24">
        <view class="flex-col items-center section_3 space-y-36">
          <tc-image width="150" height="150" src="!@/selectrepay/icon_01.png" />
          <text class="font_1">实名审核已通过，感谢您的信任！</text>
        </view>
        <view class="flex-col section_4">
          <view class="flex-row justify-between group_5">
            <text class="font_1">真实姓名</text>
            <text class="font_1">{{ userInfo.realName }}</text>
          </view>
          <view class="flex-row justify-between group_6">
            <text class="font_1">身份证号码</text>
            <text class="font_1">{{ userInfo.identityCard }}</text>
          </view>
        </view>
      </view>
      <view class="flex-col justify-start items-center section_5">
        <view class="flex-col justify-start items-center button" @click="toHome"
          ><text class="font_1 text_2">返回首页</text></view
        >
      </view>
    </view>
  </view>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
// userInfo
const userStore = useUserStore()
// 用户信息
const { userInfo } = storeToRefs(userStore)
const toHome = () => {
  uni.switchTab({
    url: '/views/home/index'
  })
}
</script>

<style scoped lang="scss">
.page {
  background-color: #f6f6f6;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  .group_3 {
    padding-top: 32rpx;
    overflow-y: auto;
    .group_4 {
      padding: 0 32rpx;
      .section_3 {
        padding: 92rpx 0;
        background-color: #ffffff;
        box-shadow: 0px 4rpx 12rpx 0px #0000000f;
        border-radius: 20rpx;
      }
      .space-y-36 {
        & > view:not(:first-child),
        & > text:not(:first-child),
        & > image:not(:first-child) {
          margin-top: 72rpx;
        }
      }
      .section_4 {
        padding: 0 40rpx;
        background-color: #ffffff;
        box-shadow: 0px 4rpx 12rpx 0px #0000000f;
        border-radius: 20rpx;
        .group_5 {
          padding: 44rpx 0;
          border-bottom: solid 2rpx #f9f9f9;
        }
        .group_6 {
          padding: 44rpx 0;
        }
      }
    }
    .space-y-24 {
      & > view:not(:first-child),
      & > text:not(:first-child),
      & > image:not(:first-child) {
        margin-top: 48rpx;
      }
    }
    .section_5 {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      padding: 22rpx 0;
      background-color: #ffffffe6;
      .button {
        padding: 28rpx 0;
        background-image: linear-gradient(180deg, #5f8aff 0%, #3d55c3 100%);
        border-radius: 48rpx;
        width: 630rpx;
        border: solid 2rpx #9eb5ea;
        .text_2 {
          color: #ffffff;
          font-size: 30rpx;
          line-height: 38rpx;
        }
      }
    }
    .font_1 {
      font-size: 28rpx;
      line-height: 36rpx;
      color: #333333;
    }
  }
  .space-y-255 {
    & > view:not(:first-child),
    & > text:not(:first-child),
    & > image:not(:first-child) {
      margin-top: 510rpx;
    }
  }
}
</style>
