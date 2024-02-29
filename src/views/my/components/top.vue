<template>
  <view class="my_content_top">
    <view class="my_content_top_text" v-if="userInfo.id">
      <view class="flex-row items-center my_content_top_text_name tc-line-1">
        <text>{{ timeState }}，{{ userInfo.nickName }}</text>
        <uni-icons type="right" size="14" color="#ccc"></uni-icons
      ></view>
      <view class="my_content_top_text_info"
        ><view
          class="my_content_top_text_info_tap"
          hover-class="hover-class"
          @click="!userInfo.isIdentity ? toCertification('my-certification') : null"
        >
          <view class="image" :class="{ 'image-grey': !userInfo.isIdentity }">
            <tc-image src="!@/user/i_03.png" width="24" height="24" mode="widthFix" />
          </view>
          <text>{{ userInfo.isIdentity ? '已实名认证' : '未实名' }}</text>
        </view>
        <!-- <view class="my_content_top_text_info_tap">
          <view class="image">
            <tc-image src="!@/my/top_icon01.png" width="40" height="40" mode="widthFix" />
          </view>
          <text>{{ honors }}个成就</text>
        </view> -->
      </view>
    </view>
    <view class="my_content_top_text" v-else>
      <view class="flex-row items-center my_content_top_text_name">
        <text style="margin-right: 24rpx">点击微信登录</text>
        <tc-image width="32" height="32" src="!@/user/i_09.png"
      /></view>
      <view class="my_content_top_text_p">一起为爱心助力，共创公益美好！</view>
    </view>
    <view class="my_content_top_img" @click="toCertification('my-info')">
      <tc-image
        v-if="userInfo.headImageUrl"
        :src="userInfo.headImageUrl"
        width="156"
        height="156"
        mode="aspectFill"
      />
      <tc-image v-else src="!@/imgs/tx.png" width="156" height="156" mode="widthFix" />
    </view>
  </view>
</template>
<script setup>
import { getTimeState } from '@/utils/common'
const props = defineProps({
  userInfo: {
    type: Object,
    default: () => ({})
  },
  honors: {
    type: [Number, String],
    default: 0
  }
})
const timeState = getTimeState()
const toCertification = (url) => {
  uni.navigateTo({
    url: '/pages/' + url + '/index'
  })
}
</script>
<style lang="scss" scoped>
.my_content_top {
  display: flex;
  padding: 0 48rpx;
  &_text {
    display: flex;
    flex: 1;
    justify-content: center;
    flex-direction: column;
    &_name {
      font-size: 36rpx;
      color: #333;
      text {
        line-height: 36rpx;
      }
    }
    &_info {
      display: flex;
      margin-top: 24rpx;
      &_tap {
        display: flex;
        align-items: center;
        padding: 0 24rpx;
        line-height: 52rpx;
        border-radius: 50px;
        border: 1px solid #f9f9f9;
        background: #fff;
        .image {
          &-grey {
            filter: grayscale(100%);
          }
        }
        text {
          margin-left: 8rpx;
          font-size: 22rpx;
          color: #666;
        }
      }
    }
    &_p {
      margin-top: 28rpx;
      color: #aaa;
      font-family: OPPOSans;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 24rpx;
    }
  }
  &_img {
    margin-left: 40rpx;
    width: 156rpx;
    height: 156rpx;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
