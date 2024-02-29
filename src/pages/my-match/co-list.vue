<template>
  <view class="my_match_li flex-col" @click="gotoInfoDetail">
    <view class="flex-row">
      <tc-image width="180rpx" height="180rpx" radius="24rpx" :src="item.coverImage" />
      <view class="my_match_li_content flex-col">
        <view>{{ item.name }}</view>
        <view class="flex-row justify-between my_match_li_content_main">
          <text class="my_match_li_content_text">{{ item.startTime }}</text>
        </view>
      </view>
    </view>
    <view class="my_match_li_bottom flex-row justify-between items-center">
      <view class="my_match_li_bottom_left flex-row items-center">
        <tc-image
          width="24rpx"
          height="24rpx"
          :src="'!@/column/match_0' + item.status + '.png'"
          mode="widgthFix"
        />
        <text class="my_match_li_bottom_left_head">{{ item.statusName }}</text>
        <text v-if="item.statusText" class="my_match_li_bottom_left_text">
          {{ item.statusText }}</text
        >
      </view>
      <view class="my_match_li_bottom_right">
        <view
          v-if="item.isPopularity == 1 && (item.status == 4 || item.status == 7)"
          class="my_match_li_bottom_right_num flex-row items-center"
        >
          <text>当前支持 </text>
          <tc-image width="24rpx" height="24rpx" src="!@/column/icon_08.png" />
          <text>{{ item.popularityNum }}</text>
        </view>
        <text v-if="item.status == 5" class="my_match_li_bottom_right_rank">{{
          item.rankingName
        }}</text>
      </view>
    </view>
  </view>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {}
    }
  }
})
// 状态 (1：审核比赛资格 2：上传比赛资料 3：等待初赛开始  6：初赛未通过 7：等待决赛   4：决赛中  5：比赛结束)   2,3,7 可以上传资料
const gotoInfoDetail = () => {
  if (props.item.status == 2 || props.item.status == 3 || props.item.status == 7) {
    uni.navigateTo({ url: 'pages/column-from/my-match-from?id=' + props.item.id })
  } else if (props.item.isPopularity == 1 && props.item.status == 4) {
    uni.navigateTo({ url: 'pages/column-vote/index?id=' + props.item.gameId })
  } else {
    uni.navigateTo({ url: 'pages/column-details/index?id=' + props.item.gameId })
  }
  // else {
  //   uni.navigateTo({ url: 'pages/column-details/index?id=' + props.item.id })
  // }
}
</script>
<style lang="scss" scoped>
.my_match_li {
  margin-top: 24rpx;
  padding: 28rpx 28rpx;
  border-radius: 28rpx;
  background: #fff;
  box-shadow: 0px 8px 16px 0px #e7e7ea;
  &_content {
    position: relative;
    flex: 1;
    margin-left: 30rpx;
    height: 180rpx;
    line-height: 48rpx;
    font-size: 30rpx;
    color: #333333;
    &_main {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 18rpx;
    }
    &_text {
      line-height: 32rpx;
      color: #666;
      font-size: 26rpx;
    }
  }
  &_bottom {
    margin-top: 32rpx;
    padding: 0 28rpx 0 40rpx;
    line-height: 68rpx;
    border: 2rpx solid #f6f6f6;
    border-radius: 12rpx;
    background: #f9f9f9;
    &_left {
      font-size: 24rpx;
      &_head {
        margin-left: 12rpx;
        color: #3d5b98;
        font-weight: bold;
      }
      &_text {
        margin-left: 40rpx;
        color: #999;
      }
    }
    &_right {
      font-size: 22rpx;
      &_num {
        color: #d14d4d;
        text {
          margin: 0 8rpx;
        }
      }
      &_rank {
        color: #3567cb;
      }
    }
  }
}
</style>
